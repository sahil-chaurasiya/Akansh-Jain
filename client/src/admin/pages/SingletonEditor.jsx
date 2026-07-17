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
      config.fields.forEach((f) => {
        if (f.type === 'json') next[f.name] = JSON.stringify(data[f.name] || [], null, 2);
        else if (f.type === 'image') imgs[f.name] = data[f.name]?.url || '';
        else next[f.name] = data[f.name] ?? '';
      });
      setValues(next);
      setExistingImages(imgs);
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
        } else if (f.type !== 'image') {
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
