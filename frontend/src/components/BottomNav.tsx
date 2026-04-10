import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="vault-bottom-nav">
      <NavLink to="/wallets" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon">🏦</span>
        <span className="label">Home</span>
      </NavLink>
      <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon">📈</span>
        <span className="label">Analytics</span>
      </NavLink>
      <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon">⏱️</span>
        <span className="label">History</span>
      </NavLink>
      <NavLink to="/diagnostics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <span className="icon">🔒</span>
        <span className="label">Vault</span>
      </NavLink>
    </nav>
  );
}
