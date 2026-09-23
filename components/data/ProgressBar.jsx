import React from 'react';

export function ProgressBar({ value = 0, max = 100, label, tone = 'brand', showValue = true, style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = { brand: 'var(--color-primary)', warning: 'var(--status-warning)', danger: 'var(--status-danger)' }[tone];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', ...style }}>
      {label || showValue ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-200)' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
          {showValue ? <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{Math.round(pct)}%</span> : null}
        </div>
      ) : null}
      <div role="progressbar" aria-valuenow={value} aria-valuemax={max} style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--neutral-10)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: fill, borderRadius: 'var(--radius-pill)', transition: 'width var(--duration-normal) var(--ease-standard)' }} />
      </div>
    </div>
  );
}
