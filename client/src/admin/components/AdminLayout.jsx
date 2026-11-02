import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { getNavGroups, navPath } from '../config/resources.js';
import './admin.css';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const [openMap, setOpenMap] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const groups = getNavGroups();
  const q = query.trim().toLowerCase();

  // A group is open if: user toggled it, or it contains the page being viewed, or a search is active.
  const isOpen = (g) => {
    if (q) return true;
    if (g.key in openMap) return openMap[g.key];
    return g.items.some((i) => pathname.startsWith(navPath(i)));
  };

  const toggle = (g) => setOpenMap((m) => ({ ...m, [g.key]: !isOpen(g) }));

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">Natural Admin</div>
        <nav onClick={() => setMenuOpen(false)}>
          <NavLink to="/admin" end className="admin-nav-link admin-nav-main">🏡 Dashboard</NavLink>
          <NavLink to="/admin/submissions" className="admin-nav-link admin-nav-main">📬 Messages &amp; Bookings</NavLink>
        </nav>

        <div className="admin-search">
          <input
            type="search"
            placeholder="Search sections…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="admin-nav-section">Edit your website</div>
        <nav onClick={() => setMenuOpen(false)}>
          {groups.map((g) => {
            const items = q
              ? g.items.filter((i) => `${i.name} ${g.title}`.toLowerCase().includes(q))
              : g.items;
            if (!items.length) return null;
            const open = isOpen(g);
            return (
              <div className="admin-nav-group" key={g.key}>
                <button
                  type="button"
                  className={`admin-nav-group-btn ${open ? 'open' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggle(g); }}
                >
                  <span>{g.icon} {g.title}</span>
                  <span className="admin-chevron">›</span>
                </button>
                {open && items.map((i) => (
                  <NavLink key={`${i.type}-${i.key}`} to={navPath(i)} className="admin-nav-link admin-nav-sub">
                    {i.name}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" className="admin-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">☰</button>
            <span>{admin?.name} <span className="admin-muted">({admin?.email})</span></span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/" target="_blank" rel="noreferrer" className="admin-btn-secondary">View website ↗</a>
            <button onClick={handleLogout} className="admin-btn-secondary">Log out</button>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}