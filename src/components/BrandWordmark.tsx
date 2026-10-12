import React from 'react';

interface BrandWordmarkProps {
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ className = '' }) => (
  <span className={`brand-wordmark ${className}`} role="img" aria-label="Afiget’">
    <span className="brand-wordmark__prefix" aria-hidden="true">Afi</span>
    <span className="brand-wordmark__main" aria-hidden="true">get’</span>
  </span>
);
