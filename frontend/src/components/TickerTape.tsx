import React from 'react';
import './TickerTape.css';

export default function TickerTape() {
  return (
    <div className="vault-ticker-container">
      <div className="vault-ticker-scroll">
        <span className="ticker-item"><span className="label">SYSTEM STATUS:</span> <span className="value positive pulse-dot">LIVE</span></span>
        <span className="ticker-item"><span className="label">BTC/USD</span> <span className="value positive">$64,281.40 (+1.2%)</span></span>
        <span className="ticker-item"><span className="label">ETH/USD</span> <span className="value positive">$3,452.12 (+0.8%)</span></span>
        <span className="ticker-item"><span className="label">SOL/USD</span> <span className="value negative">$142.10 (-0.5%)</span></span>
      </div>
    </div>
  );
}
