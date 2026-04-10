import React, { ButtonHTMLAttributes } from 'react';
import './GlowButton.css';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

export default function GlowButton({ children, variant = 'primary', fullWidth, className = '', ...props }: GlowButtonProps) {
  return (
    <button 
      className={`vault-glow-btn ${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
