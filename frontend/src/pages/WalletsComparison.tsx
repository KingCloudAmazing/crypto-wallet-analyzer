import React from 'react';
import { walletService } from '../services/api';
// Assuming TickerTape, GlowButton, VaultCard are available, though we updated styles.
import TickerTape from '../components/TickerTape';
import GlowButton from '../components/GlowButton';
import VaultCard from '../components/VaultCard';
import './WalletsComparison.css';

export default function WalletsComparison() {
  return (
    <div className="vault-page">
      <TickerTape />

      <header className="page-header">
        <h1 className="display-lg vault-text-primary">
          Wallet Benchmarking
        </h1>
        <p className="body-lg">
          Institutional-grade risk assessment and performance benchmarking between primary and counterparty entities.
        </p>
        <div style={{ marginTop: '16px' }}>
          <GlowButton variant="primary">
            Export Report
          </GlowButton>
        </div>
      </header>

      <section className="comparison-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Primary Entity */}
        <div className="vault-card entity-card">
          <div className="entity-header">
            <div className="entity-icon primary-icon">🏦</div>
            <div>
              <div className="label-sm">Primary Entity</div>
              <h2 className="display-md vault-text-primary">Alpha Strategic Reserve</h2>
              <div className="body-sm">0x71C...49EF</div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
            <div className="label-sm">Security Score</div>
            <div className="score-display">
              <span className="score-value positive">94</span>
              <span className="score-max">/100</span>
            </div>
            <div className="status-badge positive">✓ Tier 1 Credibility</div>
          </div>

          <div className="asset-balance">
            <div className="label-sm">Asset Balance</div>
            <h3 className="display-md vault-text-primary">$12,482,900.00</h3>
            <div className="body-sm positive">+11.2% (30D Growth)</div>
          </div>
          
          <div className="metrics-grid" style={{ marginTop: '1.5rem' }}>
             <div style={{ padding: '1rem', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
                <div className="label-sm">TX Density</div>
                <div className="vault-text-primary" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>1,204 / mo</div>
             </div>
             <div style={{ padding: '1rem', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
                <div className="label-sm">Avg. Vol</div>
                <div className="vault-text-primary" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$42.8k</div>
             </div>
          </div>
        </div>

        {/* Counterparty Target */}
        <div className="vault-card entity-card">
          <div className="entity-header">
            <div className="entity-icon warning-icon" style={{ color: 'var(--primary)', background: 'rgba(251, 163, 17, 0.1)' }}>⚠️</div>
            <div>
              <div className="label-sm">Comparison Target</div>
              <h2 className="display-md vault-text-primary">External Liquidity Node</h2>
              <div className="body-sm">0xEA8...2FE1</div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
            <div className="label-sm">Security Score</div>
            <div className="score-display">
               {/* Note: In Stitch orange was used as warning accent */}
              <span className="score-value warning" style={{ color: 'var(--primary)' }}>42</span>
              <span className="score-max">/100</span>
            </div>
            <div className="status-badge warning" style={{ color: 'var(--primary)' }}>! Tier 4 High Risk</div>
          </div>

          <div className="asset-balance">
            <div className="label-sm">Asset Balance</div>
            <h3 className="display-md vault-text-primary">$2,105,420.50</h3>
            <div className="body-sm negative" style={{ color: 'var(--error)' }}>-5.8% (30D Decline)</div>
          </div>
          
          <div className="metrics-grid" style={{ marginTop: '1.5rem' }}>
             <div style={{ padding: '1rem', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
                <div className="label-sm">TX Density</div>
                <div className="vault-text-primary" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>3,492 / mo</div>
             </div>
             <div style={{ padding: '1rem', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)' }}>
                <div className="label-sm">Avg. Vol</div>
                <div className="vault-text-primary" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>$2.1k</div>
             </div>
          </div>
        </div>
      </section>
      
      {/* Exposure Warning */}
      <div className="vault-card" style={{ borderLeft: '4px solid var(--primary)', marginTop: '2rem' }}>
         <div className="label-sm" style={{ color: 'var(--primary)' }}>Vault Recommendation</div>
         <h3 className="display-md vault-text-primary" style={{ fontSize: '1.5rem', margin: '8px 0'}}>EXPOSURE LIMIT REACHED</h3>
         <p className="body-sm" style={{ marginBottom: '16px' }}>
           Automated risk protocols suggest a max transaction limit of <strong className="vault-text-primary">0.5 BTC</strong> for the current interaction based on target risk profiles.
         </p>
         <button className="vault-btn vault-btn-primary">
           View Policy Details
         </button>
      </div>

    </div>
  );
}
