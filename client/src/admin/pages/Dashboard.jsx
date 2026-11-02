import { Link } from 'react-router-dom';
import { getNavGroups, navPath } from '../config/resources.js';

export default function Dashboard() {
  const groups = getNavGroups();
  return (
    <div>
      <div className="admin-page-head">
        <div>
          <h2>Welcome back 👋</h2>
          <p className="admin-sub">Pick the part of your website you want to change.</p>
        </div>
      </div>

      <Link to="/admin/submissions" className="admin-hero-card">
        <span className="admin-hero-icon">📬</span>
        <span>
          <strong>Messages &amp; Bookings</strong>
          <small>See booking requests, contact messages and consultation requests</small>
        </span>
        <span className="admin-hero-arrow">→</span>
      </Link>

      <div className="admin-grid">
        {groups.map((g) => (
          <div className="admin-card admin-group-card" key={g.key}>
            <h3>{g.icon} {g.title}</h3>
            <ul className="admin-link-list">
              {g.items.map((i) => (
                <li key={`${i.type}-${i.key}`}>
                  <Link to={navPath(i)}>
                    <span>{i.name}</span>
                    {i.desc && <small>{i.desc}</small>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}