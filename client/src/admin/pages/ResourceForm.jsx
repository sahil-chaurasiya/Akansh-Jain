import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api.js';
import { getResourceConfig } from '../config/resources.js';

const emptyValueFor = (field) => {
  if (field.type === 'boolean') return false;
  if (field.type === 'number') return '';
  if (field.type === 'tags') return '';
  // Default a fresh select to its first option so a new item always saves with a valid
  // enum value (e.g. Service.category) instead of an empty string.
  if (field.type === 'select') return field.options?.[0] ?? '';
  return '';
};

export default function ResourceForm() {
  const { resourceKey, id } = useParams();
  const config = getResourceConfig(resourceKey);
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [values, setValues] = useState(() => {
    const initial = {};
    config.fields.forEach((f) => {
      if (f.type !== 'image' && f.type !== 'imageArray' && f.type !== 'video') initial[f.name] = emptyValueFor(f);
    });
    return initial;
  });
  const [imageFiles, setImageFiles] = useState({});
  // video fields (e.g. About reels): the file picked now + the already-saved video's URL.
  const [videoFiles, setVideoFiles] = useState({});
  const [existingVideos, setExistingVideos] = useState({});
  const [existingImages, setExistingImages] = useState({});
  // imageArray fields (e.g. Service.gallery): existing = already-saved {url,publicId} list,
  // newFiles = freshly-picked File objects waiting to be uploaded on save.
  const [imageArrays, setImageArrays] = useState({});
  const [imageArrayNewFiles, setImageArrayNewFiles] = useState({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    api.get(`${config.api}/${id}`).then((res) => {
      const data = res.data.data;
      const next = {};
      config.fields.forEach((f) => {
        if (f.type === 'image' || f.type === 'imageArray' || f.type === 'video') return;
        if (f.type === 'tags') next[f.name] = (data[f.name] || []).join(', ');
        else next[f.name] = data[f.name] ?? emptyValueFor(f);
      });
      setValues(next);
      const imgs = {};
      config.fields.forEach((f) => {
        if (f.type === 'image' && data[f.name]?.url) imgs[f.name] = data[f.name].url;
      });
      setExistingImages(imgs);
      const vids = {};
      config.fields.forEach((f) => {
        if (f.type === 'video' && data[f.name]?.url) vids[f.name] = data[f.name].url;
      });
      setExistingVideos(vids);
      const imgArrays = {};
      config.fields.forEach((f) => {
        if (f.type === 'imageArray') imgArrays[f.name] = data[f.name] || [];
      });
      setImageArrays(imgArrays);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, resourceKey]);

  const setField = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      config.fields.forEach((f) => {
        if (f.type === 'image' || f.type === 'imageArray' || f.type === 'video') return;
        if (f.type === 'tags') {
          values[f.name]
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
            .forEach((t) => fd.append(f.name, t));
          if (!values[f.name]) fd.append(f.name, ''); // keep field present even if empty
        } else {
          fd.append(f.name, values[f.name] ?? '');
        }
      });
      Object.entries(imageFiles).forEach(([fieldName, file]) => {
        if (!file) return;
        // The primary image field is still sent under the literal "image" key so it keeps
        // working with routes using upload.single('image'). Extra image fields (e.g. a
        // resource with more than one photo) are sent under their real field name and
        // require the route to use upload.fields([...]) instead — see slideRoutes.js.
        fd.append(fieldName === config.imageField ? 'image' : fieldName, file);
      });

      Object.entries(videoFiles).forEach(([fieldName, file]) => {
        if (file) fd.append(fieldName, file);
      });

      // imageArray fields (e.g. gallery): upload any newly-picked files one at a time via
      // the generic /upload endpoint, then send the full desired array (kept + newly
      // uploaded) as a JSON string field so the backend can save/diff it.
      for (const f of config.fields) {
        if (f.type !== 'imageArray') continue;
        const kept = imageArrays[f.name] || [];
        const newFiles = imageArrayNewFiles[f.name] || [];
        const uploaded = [];
        for (const file of newFiles) {
          const uploadFd = new FormData();
          uploadFd.append('image', file);
          const res = await api.post('/upload', uploadFd);
          uploaded.push({ url: res.data.data.url, publicId: res.data.data.publicId });
        }
        fd.append(f.name, JSON.stringify([...kept, ...uploaded]));
      }

      if (isNew) {
        const res = await api.post(config.api, fd);
        navigate(`/admin/resource/${resourceKey}/${res.data.data._id}`);
      } else {
        await api.put(`${config.api}/${id}`, fd);
      }
      setSaving(false);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.map((e) => e.message).join(', ') || 'Save failed');
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>{isNew ? `Add ${config.label}` : `Edit ${config.label}`}</h2>
        <Link to={`/admin/resource/${resourceKey}`} className="admin-btn-secondary">← Back to list</Link>
      </div>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      <form onSubmit={submit} className="admin-card">
        {config.fields.map((f) => {
          if (f.type === 'image') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                {existingImages[f.name] && !imageFiles[f.name] && (
                  <img src={existingImages[f.name]} alt="" style={{ width: 100, display: 'block', marginBottom: 8, borderRadius: 4 }} />
                )}
                <input type="file" accept="image/*" onChange={(e) => setImageFiles((p) => ({ ...p, [f.name]: e.target.files[0] }))} />
              </div>
            );
          }
          if (f.type === 'video') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                {existingVideos[f.name] && !videoFiles[f.name] && (
                  <video
                    src={existingVideos[f.name]}
                    controls
                    muted
                    preload="metadata"
                    style={{ width: 120, display: 'block', marginBottom: 8, borderRadius: 6 }}
                  />
                )}
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/x-matroska"
                  required={isNew && f.required !== false}
                  onChange={(e) => setVideoFiles((p) => ({ ...p, [f.name]: e.target.files[0] }))}
                />
                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  {isNew ? 'Required.' : 'Leave empty to keep the current video.'} Uploading a large video can take a minute — wait for "Save" to finish.
                </p>
              </div>
            );
          }
          if (f.type === 'imageArray') {
            const kept = imageArrays[f.name] || [];
            const pending = imageArrayNewFiles[f.name] || [];
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
                  {kept.map((img, i) => (
                    <div key={img.publicId || img.url || i} style={{ position: 'relative' }}>
                      <img src={img.url} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4, display: 'block' }} />
                      <button
                        type="button"
                        onClick={() => setImageArrays((p) => ({ ...p, [f.name]: p[f.name].filter((_, idx) => idx !== i) }))}
                        style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: '#c0392b', color: '#fff', cursor: 'pointer', lineHeight: '20px', padding: 0 }}
                        title="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {pending.map((file, i) => (
                    <div key={`new-${i}`} style={{ position: 'relative' }}>
                      <img src={URL.createObjectURL(file)} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 4, display: 'block', opacity: 0.7 }} />
                      <button
                        type="button"
                        onClick={() => setImageArrayNewFiles((p) => ({ ...p, [f.name]: p[f.name].filter((_, idx) => idx !== i) }))}
                        style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: '#c0392b', color: '#fff', cursor: 'pointer', lineHeight: '20px', padding: 0 }}
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImageArrayNewFiles((p) => ({ ...p, [f.name]: [...(p[f.name] || []), ...Array.from(e.target.files)] }))
                  }
                />
                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Add one or more photos. Click × to remove one.</p>
              </div>
            );
          }
          if (f.type === 'textarea' || f.type === 'richtext') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}{f.type === 'richtext' && ' (HTML allowed)'}</label>
                <textarea
                  required={f.required}
                  value={values[f.name] || ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  style={f.type === 'richtext' ? { minHeight: 200, fontFamily: 'monospace' } : undefined}
                />
              </div>
            );
          }
          if (f.type === 'boolean') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>
                  <input type="checkbox" checked={!!values[f.name]} onChange={(e) => setField(f.name, e.target.checked)} style={{ width: 'auto', marginRight: 8 }} />
                  {f.label}
                </label>
              </div>
            );
          }
          if (f.type === 'select') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <select value={values[f.name] || ''} onChange={(e) => setField(f.name, e.target.value)}>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            );
          }
          return (
            <div className="admin-form-group" key={f.name}>
              <label>{f.label}</label>
              <input
                type={f.type === 'number' ? 'number' : 'text'}
                required={f.required}
                value={values[f.name] ?? ''}
                onChange={(e) => setField(f.name, e.target.value)}
              />
            </div>
          );
        })}
        <div className="admin-form-actions">
          <button className="admin-btn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}