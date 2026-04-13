import React from 'react';

export default function PastAnalyses() {
  const scans = [
    { address: '0xd8dA...045', date: '2026-04-12', chain: 'Ethereum', risk: 24, status: 'Low Risk' },
    { address: '0xEA8a...FE1', date: '2026-04-10', chain: 'Polygon', risk: 89, status: 'High Risk' },
    { address: '0x12bF...92C', date: '2026-04-08', chain: 'BSC', risk: 45, status: 'Medium Risk' },
  ];

  return (
    <div className="vault-page fade-in-up">
      <header>
        <h1 className="display-lg vault-text-primary">Past Analyses</h1>
        <p className="body-lg">Filterable database log of all previous scans.</p>
      </header>

      <div className="vault-card fade-in-up stagger-1" style={{ marginTop: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--outline)', color: 'var(--on-surface-variant)' }}>
              <th style={{ padding: '1rem' }}>Wallet Address</th>
              <th style={{ padding: '1rem' }}>Chain</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Risk Score</th>
              <th style={{ padding: '1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem' }} className="vault-text-primary">{scan.address}</td>
                <td style={{ padding: '1rem' }}>{scan.chain}</td>
                <td style={{ padding: '1rem' }}>{scan.date}</td>
                <td style={{ padding: '1rem' }} className="vault-text-accent">{scan.risk}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                    background: scan.risk > 50 ? 'var(--error)' : 'var(--success)', 
                    color: '#000' 
                  }}>
                    {scan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
