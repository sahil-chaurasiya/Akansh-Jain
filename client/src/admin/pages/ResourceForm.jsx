import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api.js';
import { getResourceConfig } from '../config/resources.js';

const emptyValueFor = (type) => {
  if (type === 'boolean') return false;
  if (type === 'number') return '';
  if (type === 'tags') return '';
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
      if (f.type !== 'image') initial[f.name] = emptyValueFor(f.type);
    });
    return initial;
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    api.get(`${config.api}/${id}`).then((res) => {
      const data = res.data.data;
      const next = {};
      config.fields.forEach((f) => {
        if (f.type === 'image') return;
        if (f.type === 'tags') next[f.name] = (data[f.name] || []).join(', ');
        else next[f.name] = data[f.name] ?? emptyValueFor(f.type);
      });
      setValues(next);
      if (config.imageField && data[config.imageField]?.url) {
        setExistingImageUrl(data[config.imageField].url);
      }
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
        if (f.type === 'image') return;
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
      if (imageFile) fd.append('image', imageFile);

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
                {existingImageUrl && !imageFile && (
                  <img src={existingImageUrl} alt="" style={{ width: 100, display: 'block', marginBottom: 8, borderRadius: 4 }} />
                )}
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
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
