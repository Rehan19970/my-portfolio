import { NavLink, useNavigate } from 'react-router-dom';
import { logout, getAdminUser } from '../../api/auth';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const user = getAdminUser();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '▦' },
    { to: '/admin/projects', label: 'Projects', icon: '◆' },
    { to: '/admin/experience', label: 'Experience', icon: '◈' },
    { to: '/admin/skills', label: 'Skills', icon: '◇' },
    { to: '/admin/settings', label: 'Settings', icon: '⚙' },
    { to: '/admin/messages', label: 'Messages', icon: '✉' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <span>R</span>
        <b>ADMIN</b>
      </div>

      <nav className="admin-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `admin-nav-item ${isActive ? 'on' : ''}`}
          >
            <span className="admin-nav-icon">{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <div className="admin-avatar">{user?.name?.[0] || 'A'}</div>
          <div>
            <b>{user?.name || 'Admin'}</b>
            <small>{user?.email || ''}</small>
          </div>
        </div>
        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}