import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '—' },
    { name: 'Wallets', path: '/wallets', icon: '—' },
    { name: 'Past Analyses', path: '/past-analyses', icon: '—' },
    { name: 'Diagnostics', path: '/diagnostics', icon: '—' },
    { name: 'API Reference', path: '/api', icon: '—' },
    { name: 'Support', path: '/support', icon: '—' },
    { name: 'About Founders', path: '/founders', icon: '—' },
  ];

  return (
    <aside className="vault-sidebar">
      <div className="sidebar-header">
        <h2 className="display-md vault-text-accent">VaultRisk</h2>
        <span className="label-sm">Enterprise Data</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-dot online"></div>
          <span className="label-sm">Systems Online</span>
        </div>
      </div>
    </aside>
  );
}
