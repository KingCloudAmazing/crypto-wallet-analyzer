import React from 'react';
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
          WALLETS<br />
          COMPARISON
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

      <section className="comparison-section">
        <VaultCard className="entity-card">
          <div className="entity-header">
            <div className="entity-icon primary-icon">🏦</div>
            <div>
              <div className="label-sm">Primary Entity</div>
              <h2 className="display-md vault-text-primary">Alpha Strategic Reserve</h2>
              <div className="body-sm">0x71C...49EF</div>
            </div>
          </div>

          <VaultCard variant="nested" className="score-card">
            <div className="label-sm">Security Score</div>
            <div className="score-display">
              <span className="score-value positive">94</span>
              <span className="score-max">/100</span>
            </div>
            <div className="status-badge positive">✓ Tier 1 Credibility</div>
          </VaultCard>

          <div className="asset-balance">
            <div className="label-sm">Asset Balance</div>
            <h3 className="display-md vault-text-primary">$12,482,900.00</h3>
            <div className="body-sm positive">+11.2% (30D Growth)</div>
          </div>
          
          <div className="metrics-grid">
             <VaultCard variant="nested" className="metric-box">
                <div className="label-sm">TX Density</div>
                <div className="vault-text-primary">1,204 / mo</div>
             </VaultCard>
             <VaultCard variant="nested" className="metric-box">
                <div className="label-sm">Avg. Vol</div>
                <div className="vault-text-primary">$42.8k</div>
             </VaultCard>
          </div>
        </VaultCard>

        {/* Counterparty Target */}
        <VaultCard className="entity-card">
          <div className="entity-header">
            <div className="entity-icon warning-icon">⚠️</div>
            <div>
              <div className="label-sm">Comparison Target</div>
              <h2 className="display-md vault-text-primary">External Liquidity Node</h2>
              <div className="body-sm">0xEA8...2FE1</div>
            </div>
          </div>

          <VaultCard variant="nested" className="score-card">
            <div className="label-sm">Security Score</div>
            <div className="score-display">
              <span className="score-value warning">42</span>
              <span className="score-max">/100</span>
            </div>
            <div className="status-badge warning">! Tier 4 High Risk</div>
          </VaultCard>

          <div className="asset-balance">
            <div className="label-sm">Asset Balance</div>
            <h3 className="display-md vault-text-primary">$2,105,420.50</h3>
            <div className="body-sm negative">-5.8% (30D Decline)</div>
          </div>
        </VaultCard>
        
        {/* Exposure Warning */}
        <VaultCard variant="actionable" className="exposure-warning">
           <div className="label-sm" style={{ color: 'var(--primary)' }}>Vault Recommendation</div>
           <h3 className="display-md vault-text-primary" style={{ fontSize: '1.25rem', margin: '8px 0'}}>EXPOSURE LIMIT REACHED</h3>
           <p className="body-sm mb-4">
             Automated risk protocols suggest a max transaction limit of <strong className="vault-text-primary">0.5 BTC</strong> for the current interaction based on target risk profiles.
           </p>
           <GlowButton variant="secondary" fullWidth>
             View Policy Details
           </GlowButton>
        </VaultCard>

      </section>
    </div>
  );
}
