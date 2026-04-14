import React, { useEffect, useState } from 'react';
import { walletService, RiskAnalysisResult } from '../services/api';

export default function PastAnalyses() {
  const [scans, setScans] = useState<RiskAnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    walletService.getAllAnalyses()
      .then(data => {
        setScans(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="vault-page fade-in-up">
      <header>
        <h1 className="display-lg vault-text-primary">Past Analyses</h1>
        <p className="body-lg">Filterable database log of all previous scans.</p>
      </header>

      <div className="vault-card fade-in-up stagger-1" style={{ marginTop: '2rem' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            Retrieving vault logs...
          </div>
        ) : scans.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            No analysis records found. Run a scan from the Dashboard.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--outline)', color: 'var(--on-surface-variant)' }}>
                <th style={{ padding: '1rem' }}>Wallet Address</th>
                <th style={{ padding: '1rem' }}>Chain</th>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Risk Score</th>
                <th style={{ padding: '1rem' }}>Tier</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }} className="vault-text-primary font-mono">
                    {scan.wallet.slice(0, 6)}...{scan.wallet.slice(-4)}
                  </td>
                  <td style={{ padding: '1rem' }}>{scan.chain}</td>
                  <td style={{ padding: '1rem' }}>
                   {new Date((scan as any).updatedAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }} className="vault-text-accent">{scan.score}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                      background: scan.score > 50 ? 'var(--error)' : 'var(--success)', 
                      color: '#000' 
                    }}>
                      {scan.tier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
