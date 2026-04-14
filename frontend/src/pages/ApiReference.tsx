import React from 'react';

export default function ApiReference() {
  return (
    <div className="vault-page fade-in-up">
      <header>
        <h1 className="display-lg vault-text-primary">API Reference</h1>
        <p className="body-lg">Structured documentation for the Node.js and Python microservices.</p>
      </header>

      <div className="vault-card fade-in-up stagger-1 vault-card-interactive" style={{ marginTop: '2rem' }}>
        <h2 className="display-md vault-text-primary" style={{ marginBottom: '1rem' }}>Backend HTTP Endpoints</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ padding: '1rem', background: 'var(--surface)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
            <div className="hflex gap-sm" style={{ marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--primary)', color: 'var(--on-primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>POST</span>
              <span className="vault-text-primary font-mono">/api/wallet/analyze</span>
            </div>
            <p className="body-sm">Analyzes wallet and computes real-time institutional risk scores.</p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
            <div className="hflex gap-sm" style={{ marginBottom: '0.5rem' }}>
              <span style={{ background: 'var(--success)', color: 'var(--on-primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>GET</span>
              <span className="vault-text-primary font-mono">/api/wallet/transactions</span>
            </div>
            <p className="body-sm">Fetches normalized multi-chain transaction history.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
