import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WalletsComparison from './pages/WalletsComparison';
import SystemDiagnostics from './pages/SystemDiagnostics';
import Dashboard from './pages/Dashboard';
import PastAnalyses from './pages/PastAnalyses';
import ApiReference from './pages/ApiReference';
import Support from './pages/Support';
import AboutFounders from './pages/AboutFounders';

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
            <Route path="/past-analyses" element={<PastAnalyses />} />
            <Route path="/diagnostics" element={<SystemDiagnostics />} />
            <Route path="/api" element={<ApiReference />} />
            <Route path="/support" element={<Support />} />
            <Route path="/founders" element={<AboutFounders />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
