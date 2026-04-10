import React from 'react';
import VaultCard from '../components/VaultCard';
import './SystemDiagnostics.css';

export default function SystemDiagnostics() {
  return (
    <div className="vault-page pb-nav">
      <header className="page-header">
        <div className="label-sm" style={{ color: 'var(--primary)' }}>SYSTEM DIAGNOSTICS</div>
        <h1 className="display-md vault-text-primary">Core Health</h1>
      </header>

      <div className="global-stats-grid">
        <VaultCard variant="nested" className="stat-card">
          <div className="label-sm">GLOBAL UPTIME</div>
          <div className="stat-value positive">99.998%</div>
        </VaultCard>
        <VaultCard variant="nested" className="stat-card">
          <div className="label-sm">INCIDENTS (24H)</div>
          <div className="stat-value vault-text-primary">0</div>
        </VaultCard>
      </div>

      <section className="services-section">
        <VaultCard className="service-card">
          <div className="service-header">
             <div className="service-title">
               <span className="pulse-dot"></span>
               <span className="label-sm vault-text-primary">NODE.JS BACKEND</span>
             </div>
             <div className="service-icon">⚡️</div>
          </div>
          <div className="service-status body-lg vault-text-primary">Operational</div>
          
          <div className="service-metrics">
            <div className="metric">
              <span className="label-sm">LATENCY</span>
              <span className="value positive">14ms</span>
            </div>
            <div className="metric">
              <span className="label-sm">UPTIME</span>
              <span className="value vault-text-primary">99.99%</span>
            </div>
          </div>
        </VaultCard>

        <VaultCard className="service-card">
          <div className="service-header">
             <div className="service-title">
               <span className="pulse-dot"></span>
               <span className="label-sm vault-text-primary">PYTHON ENGINE</span>
             </div>
             <div className="service-icon">⚙️</div>
          </div>
          <div className="service-status body-lg vault-text-primary">Task Queue Processing [Idle]</div>
          
          <div className="service-metrics">
            <div className="metric">
              <span className="label-sm">LATENCY</span>
              <span className="value positive">112ms</span>
            </div>
            <div className="metric">
              <span className="label-sm">UPTIME</span>
              <span className="value vault-text-primary">99.95%</span>
            </div>
          </div>
        </VaultCard>

        <VaultCard className="service-card">
          <div className="service-header">
             <div className="service-title">
               <span className="pulse-dot"></span>
               <span className="label-sm vault-text-primary">MONGODB CLUSTER</span>
             </div>
             <div className="service-icon">🗄️</div>
          </div>
          <div className="service-status body-lg vault-text-primary">Region: us-east-1</div>
          
          <div className="service-metrics">
            <div className="metric">
              <span className="label-sm">LATENCY</span>
              <span className="value positive">8ms</span>
            </div>
            <div className="metric">
              <span className="label-sm">UPTIME</span>
              <span className="value vault-text-primary">100%</span>
            </div>
          </div>
        </VaultCard>
      </section>

      <VaultCard variant="actionable" className="recent-events">
        <h3 className="vault-text-primary mb-4" style={{ fontSize: '1.125rem' }}>Recent Events</h3>
        <ul className="event-list">
          <li className="event-item">
             <div className="event-icon positive">✓</div>
             <div className="event-details">
               <div className="vault-text-primary body-sm">Backup completed successfully</div>
               <div className="label-sm">02:14 AM UTC</div>
             </div>
          </li>
          <li className="event-item">
             <div className="event-icon warning">△</div>
             <div className="event-details">
               <div className="vault-text-primary body-sm">High latency detected - Python Engine</div>
               <div className="label-sm">AUG 24, 04:12 PM</div>
             </div>
          </li>
        </ul>
      </VaultCard>

    </div>
  );
}
