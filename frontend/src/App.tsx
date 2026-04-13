import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WalletsComparison from './pages/WalletsComparison';
import SystemDiagnostics from './pages/SystemDiagnostics';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="vault-app-container">
        <Sidebar />
        <main className="vault-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallets" element={<WalletsComparison />} />
            <Route path="/diagnostics" element={<SystemDiagnostics />} />
            <Route path="/analytics" element={<div className="vault-page"><h1 className="display-lg vault-text-primary">Analytics</h1><p className="body-md">Advanced digital asset forensics (Stub)</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
