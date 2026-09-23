import React from 'react';

export function Slider({ label, min = 0, max = 100, step = 1, value = 0, unit = '', disabled = false, onChange, style, ...rest }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontFamily: 'var(--font-sans)', ...style }}>
      {label ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-200)', color: 'var(--text-secondary)' }}>{value}{unit}</span>
        </div>
      ) : null}
      <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 'var(--radius-pill)', background: 'var(--neutral-20)' }} />
        <div style={{ position: 'absolute', left: 0, width: pct + '%', height: 4, borderRadius: 'var(--radius-pill)', background: disabled ? 'var(--neutral-30)' : 'var(--color-primary)' }} />
        <div style={{ position: 'absolute', left: 'calc(' + pct + '% - 9px)', width: 18, height: 18, borderRadius: 'var(--radius-circle)', background: 'var(--surface-card)', border: '2px solid ' + (disabled ? 'var(--neutral-30)' : 'var(--color-primary)'), boxShadow: 'var(--shadow-100)' }} />
        <input type="range" min={min} max={max} step={step} value={value} disabled={disabled} onChange={onChange}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer', margin: 0 }} {...rest} />
      </div>
    </div>
  );
}
