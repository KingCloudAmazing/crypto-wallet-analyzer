import React, { ReactNode } from 'react';
import './VaultCard.css';

interface VaultCardProps {
  children: ReactNode;
  variant?: 'nested' | 'actionable' | 'default';
  className?: string;
}

export default function VaultCard({ children, variant = 'default', className = '' }: VaultCardProps) {
  return (
    <div className={`vault-card ${variant} ${className}`}>
      {children}
    </div>
  );
}
