import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api.js';
import { getResourceConfig, getNiceInfo } from '../config/resources.js';

export default function ResourceList() {
  const { resourceKey } = useParams();
  const config = getResourceConfig(resourceKey);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api
      .get(config.api)
      .then((res) => setItems(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  const remove = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await api.delete(`${config.api}/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  if (!config) return <p>Unknown resource.</p>;

  // Prefer a few informative columns over dumping every field into the table.
  const previewFields = config.fields.filter((f) => ['text', 'number', 'select'].includes(f.type)).slice(0, 3);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="admin-page-head" style={{ margin: 0 }}><div><h2>{getNiceInfo('resource', resourceKey, config.label).title}</h2><p className="admin-sub">{getNiceInfo('resource', resourceKey, '').desc}</p></div></div>
        <Link to={`/admin/resource/${resourceKey}/new`} className="admin-btn">+ Add New</Link>
      </div>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: '#777' }}>Nothing here yet. Click "Add New" to create the first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              {config.imageField && <th>Image</th>}
              {previewFields.map((f) => (
                <th key={f.name}>{f.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {config.imageField && (
                  <td>
                    {item[config.imageField]?.url && <img src={item[config.imageField].url} alt="" className="thumb" />}
                  </td>
                )}
                {previewFields.map((f) => (
                  <td key={f.name}>{String(item[f.name] ?? '')}</td>
                ))}
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Link to={`/admin/resource/${resourceKey}/${item._id}`} className="admin-btn-secondary" style={{ marginRight: 8 }}>
                    Edit
                  </Link>
                  <button className="admin-btn-danger" onClick={() => remove(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}