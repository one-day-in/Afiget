import React from 'react';

interface BrandWordmarkProps {
  className?: string;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ className = '' }) => (
  <span className={`brand-wordmark ${className}`} role="img" aria-label="Афиget'">
    <span className="brand-wordmark__cyrillic" aria-hidden="true">Афи</span>
    <span className="brand-wordmark__latin" aria-hidden="true">get'</span>
  </span>
);
