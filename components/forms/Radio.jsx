import React from 'react';

export function Radio({ label, description, checked = false, disabled = false, name, value, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', gap: 'var(--space-4)', alignItems: 'flex-start', fontFamily: 'var(--font-sans)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 20, height: 20, flex: '0 0 20px', marginTop: 2, borderRadius: 'var(--radius-circle)',
        border: (checked ? '6px solid var(--color-primary)' : '1px solid var(--border-strong)'),
        background: 'var(--surface-card)', transition: 'var(--transition-interactive)',
      }} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-primary)' }}>{label}</span>
        {description ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{description}</span> : null}
      </span>
    </label>
  );
}
