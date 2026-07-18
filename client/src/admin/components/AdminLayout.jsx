import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { RESOURCES, SINGLETONS } from '../config/resources.js';
import './admin.css';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Natural Admin</div>
        <nav>
          <NavLink to="/admin" end className="admin-nav-link">Dashboard</NavLink>
          <NavLink to="/admin/submissions" className="admin-nav-link">Form Submissions</NavLink>

          <div className="admin-nav-section">Site Content</div>
          {SINGLETONS.map((s) => (
            <NavLink key={s.key} to={`/admin/singleton/${s.key}`} className="admin-nav-link">
              {s.label}
            </NavLink>
          ))}

          <div className="admin-nav-section">Collections</div>
          {RESOURCES.map((r) => (
            <NavLink key={r.key} to={`/admin/resource/${r.key}`} className="admin-nav-link">
              {r.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <span>{admin?.name} ({admin?.email})</span>
          <button onClick={handleLogout} className="admin-btn-secondary">Log out</button>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}