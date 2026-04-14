import React from 'react';

export default function Support() {
  return (
    <div className="vault-page fade-in-up">
      <header>
        <h1 className="display-lg vault-text-primary">Support & Reporting</h1>
        <p className="body-lg">Dedicated interface for bug reports, queries, and system outages.</p>
      </header>

      <div className="vault-card fade-in-up stagger-1 vault-card-interactive" style={{ maxWidth: '600px', marginTop: '2rem' }}>
        <h2 className="display-md vault-text-primary" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Submit a Ticket</h2>
        
        <form className="vflex gap-md" onSubmit={(e) => e.preventDefault()}>
          <div className="vflex gap-sm">
            <label className="label-sm">Issue Type</label>
            <select className="vault-border-input" style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', color: 'var(--on-surface)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)' }}>
              <option>Bug Report</option>
              <option>API Outage</option>
              <option>Feature Request</option>
            </select>
          </div>

          <div className="vflex gap-sm">
            <label className="label-sm">Description</label>
            <textarea 
              rows={4} 
              placeholder="Describe the anomalies detected..."
              style={{ width: '100%', padding: '0.75rem', background: 'var(--surface)', color: 'var(--on-surface)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)' }}
            ></textarea>
          </div>

          <button type="submit" className="vault-btn vault-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
