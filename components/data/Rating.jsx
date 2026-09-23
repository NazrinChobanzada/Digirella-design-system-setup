import React from 'react';

export function Rating({ value = 0, count, size = 16, showValue = true, style }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', ...style }}>
      <span aria-label={value + ' out of 5'} style={{ display: 'inline-flex', gap: 1, lineHeight: 1 }}>
        {stars.map((s) => (
          <span key={s} style={{ fontSize: size, color: value >= s - 0.5 ? 'var(--color-primary)' : 'var(--neutral-30)' }}>★</span>
        ))}
      </span>
      {showValue ? <span style={{ fontSize: 'var(--font-size-200)', fontWeight: 600, color: 'var(--text-primary)' }}>{value.toFixed(1)}</span> : null}
      {count != null ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>({count})</span> : null}
    </span>
  );
}
