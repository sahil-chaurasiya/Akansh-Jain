import { useEffect, useState } from 'react';
import api from '../../lib/api.js';

const TABS = [
  { key: 'booking', label: 'Booking Requests' },
  { key: 'contact', label: 'Contact Messages' },
  { key: 'newsletter', label: 'Newsletter Signups' },
];

export default function Submissions() {
  const [tab, setTab] = useState('booking');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get(`/submissions/${tab}`).then((res) => setItems(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id, status) => {
    await api.patch(`/submissions/${tab}/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this submission?')) return;
    await api.delete(`/submissions/${tab}/${id}`);
    load();
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Form Submissions</h2>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`admin-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p style={{ color: '#777' }}>No submissions yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              {tab !== 'newsletter' && <th>Name</th>}
              <th>Email</th>
              {tab === 'booking' && (
                <>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                </>
              )}
              {tab === 'contact' && <th>Subject</th>}
              {tab !== 'newsletter' && <th>Message</th>}
              <th>Received</th>
              {tab !== 'newsletter' && <th>Status</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {tab !== 'newsletter' && <td>{item.name}</td>}
                <td>{item.email}</td>
                {tab === 'booking' && (
                  <>
                    <td>{item.phone}</td>
                    <td>{item.service}</td>
                    <td>{item.date}</td>
                  </>
                )}
                {tab === 'contact' && <td>{item.subject}</td>}
                {tab !== 'newsletter' && <td style={{ maxWidth: 260 }}>{item.message}</td>}
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                {tab !== 'newsletter' && (
                  <td>
                    <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)}>
                      {(tab === 'booking' ? ['new', 'contacted', 'closed'] : ['new', 'read', 'closed']).map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                )}
                <td>
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
