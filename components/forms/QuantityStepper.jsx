import React from 'react';

export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, disabled = false, style }) {
  const set = (n) => { if (!disabled && n >= min && n <= max) onChange && onChange(n); };
  const btn = (active) => ({
    width: 34, height: 34, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: 0, background: 'transparent', cursor: active ? 'pointer' : 'not-allowed',
    color: active ? 'var(--text-primary)' : 'var(--text-disabled)', fontSize: 'var(--font-size-400)', lineHeight: 1,
  });
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-control)', borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', ...style }}>
      <button type="button" aria-label="Decrease" onClick={() => set(value - 1)} style={btn(value > min && !disabled)}>−</button>
      <span style={{ minWidth: 32, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-300)', color: 'var(--text-primary)' }}>{value}</span>
      <button type="button" aria-label="Increase" onClick={() => set(value + 1)} style={btn(value < max && !disabled)}>＋</button>
    </div>
  );
}
