import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WalletsComparison from './pages/WalletsComparison';
import SystemDiagnostics from './pages/SystemDiagnostics';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <Router>
      <div className="vault-app-container">
        <div className="vault-content">
          <Routes>
            <Route path="/" element={<Navigate to="/wallets" replace />} />
            <Route path="/wallets" element={<WalletsComparison />} />
            <Route path="/diagnostics" element={<SystemDiagnostics />} />
            <Route path="/analytics" element={<div className="vault-page"><h1 className="display-lg vault-text-primary">Analytics</h1><p className="body-md">Advanced digital asset forensics (Stub)</p></div>} />
            <Route path="/history" element={<div className="vault-page"><h1 className="display-lg vault-text-primary">History</h1><p className="body-md">Cold storage orchestration logs (Stub)</p></div>} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}
