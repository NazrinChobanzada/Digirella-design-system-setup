import React from 'react';

export function Skeleton({ width = '100%', height = 14, shape = 'line', style }) {
  const radius = shape === 'circle' ? 'var(--radius-circle)' : shape === 'block' ? 'var(--radius-sm)' : 'var(--radius-xs)';
  return (
    <span aria-hidden="true" style={{
      display: 'block', width, height: shape === 'circle' ? width : height, borderRadius: radius,
      background: 'linear-gradient(90deg, var(--neutral-10) 25%, var(--neutral-05) 37%, var(--neutral-10) 63%)',
      backgroundSize: '400% 100%', animation: 'digirella-shimmer 1.4s ease-in-out infinite', ...style,
    }} />
  );
}
