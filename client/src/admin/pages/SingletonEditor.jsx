import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api.js';
import { SINGLETONS } from '../config/resources.js';

export default function SingletonEditor() {
  const { singletonKey } = useParams();
  const config = SINGLETONS.find((s) => s.key === singletonKey);
  const [values, setValues] = useState({});
  const [imageFiles, setImageFiles] = useState({});
  const [existingImages, setExistingImages] = useState({});
  // imageArray fields (e.g. AboutSection.images): existing = already-saved {url,publicId} list,
  // newFiles = freshly-picked File objects waiting to be uploaded on save.
  const [imageArrays, setImageArrays] = useState({});
  const [imageArrayNewFiles, setImageArrayNewFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(config.api).then((res) => {
      const data = res.data.data;
      const next = {};
      const imgs = {};
      const imgArrays = {};
      config.fields.forEach((f) => {
        if (f.type === 'json') next[f.name] = JSON.stringify(data[f.name] || [], null, 2);
        else if (f.type === 'image') imgs[f.name] = data[f.name]?.url || '';
        else if (f.type === 'imageArray') imgArrays[f.name] = data[f.name] || [];
        else if (f.type === 'lines') next[f.name] = (data[f.name] || []).join('\n');
        else if (f.type === 'statLines')
          next[f.name] = (data[f.name] || []).map((it) => `${it.number || ''} | ${it.label || ''}`).join('\n');
        else next[f.name] = data[f.name] ?? '';
      });
      setValues(next);
      setExistingImages(imgs);
      setImageArrays(imgArrays);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singletonKey]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      // JSON fields need validating + parsing; images need a separate upload since this
      // singleton endpoint accepts plain JSON (not multipart) for simplicity.
      const payload = {};
      for (const f of config.fields) {
        if (f.type === 'json') {
          try {
            payload[f.name] = values[f.name] ? JSON.parse(values[f.name]) : [];
          } catch {
            throw new Error(`"${f.label}" is not valid JSON`);
          }
        } else if (f.type === 'lines') {
          payload[f.name] = (values[f.name] || '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);
        } else if (f.type === 'statLines') {
          payload[f.name] = (values[f.name] || '')
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
              const [number, ...rest] = line.split('|');
              return { number: (number || '').trim(), label: rest.join('|').trim() };
            });
        } else if (f.type !== 'image' && f.type !== 'imageArray') {
          payload[f.name] = values[f.name];
        }
      }

      // Upload any newly-selected images first, one at a time, via the generic upload endpoint.
      for (const f of config.fields) {
        if (f.type === 'image' && imageFiles[f.name]) {
          const fd = new FormData();
          fd.append('image', imageFiles[f.name]);
          const res = await api.post('/upload', fd);
          payload[f.name] = { url: res.data.data.url, publicId: res.data.data.publicId };
        }
        if (f.type === 'imageArray') {
          const kept = imageArrays[f.name] || [];
          const newFiles = imageArrayNewFiles[f.name] || [];
          const uploaded = [];
          for (const file of newFiles) {
            const fd = new FormData();
            fd.append('image', file);
            const res = await api.post('/upload', fd);
            uploaded.push({ url: res.data.data.url, publicId: res.data.data.publicId });
          }
          payload[f.name] = [...kept, ...uploaded];
        }
      }

      await api.put(config.api, payload);
      setSuccess(true);
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!config) return <p>Unknown section.</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>{config.label}</h2>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && <div className="admin-alert admin-alert-success">Saved.</div>}
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
          if (f.type === 'json') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <textarea
                  style={{ minHeight: 140, fontFamily: 'monospace', fontSize: 13 }}
                  value={values[f.name] || ''}
                  onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                />
              </div>
            );
          }
          if (f.type === 'lines') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <textarea
                  style={{ minHeight: 140 }}
                  placeholder="Type one item per line..."
                  value={values[f.name] || ''}
                  onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                />
                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  Just type each point on its own line — no special formatting needed.
                </p>
              </div>
            );
          }
          if (f.type === 'statLines') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <textarea
                  style={{ minHeight: 140 }}
                  placeholder={'7,000+ | Gynecomastia\n5,000+ | Hair Transplantation'}
                  value={values[f.name] || ''}
                  onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                />
                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  One per line. Type the number, then a "|", then the label — e.g. "7,000+ | Gynecomastia".
                </p>
              </div>
            );
          }
          if (f.type === 'textarea') {
            return (
              <div className="admin-form-group" key={f.name}>
                <label>{f.label}</label>
                <textarea value={values[f.name] || ''} onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))} />
              </div>
            );
          }
          return (
            <div className="admin-form-group" key={f.name}>
              <label>{f.label}</label>
              <input type="text" value={values[f.name] || ''} onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))} />
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