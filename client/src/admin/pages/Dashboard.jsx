import { Link } from 'react-router-dom';
import { RESOURCES, SINGLETONS } from '../config/resources.js';

export default function Dashboard() {
  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Dashboard</h2>
      <div className="admin-card">
        <h3>Site-wide Content</h3>
        <p style={{ color: '#777', fontSize: 14 }}>Single, sitewide blocks (header, footer, about, etc.)</p>
        <ul>
          {SINGLETONS.map((s) => (
            <li key={s.key}>
              <Link to={`/admin/singleton/${s.key}`}>{s.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-card">
        <h3>Collections</h3>
        <p style={{ color: '#777', fontSize: 14 }}>Lists of repeatable content (services, posts, team, etc.)</p>
        <ul>
          {RESOURCES.map((r) => (
            <li key={r.key}>
              <Link to={`/admin/resource/${r.key}`}>{r.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-card">
        <h3>Form Submissions</h3>
        <p style={{ color: '#777', fontSize: 14 }}>
          <Link to="/admin/submissions">View booking, contact, and newsletter submissions</Link>
        </p>
      </div>
    </div>
  );
}
