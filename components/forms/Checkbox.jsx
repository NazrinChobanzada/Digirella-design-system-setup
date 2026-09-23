import React from 'react';

export function Checkbox({ label, description, checked = false, disabled = false, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', gap: 'var(--space-4)', alignItems: 'flex-start', fontFamily: 'var(--font-sans)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 20, height: 20, flex: '0 0 20px', marginTop: 2, borderRadius: 'var(--radius-xs)',
        border: '1px solid ' + (checked ? 'var(--color-primary)' : 'var(--border-strong)'),
        background: checked ? 'var(--color-primary)' : 'var(--surface-card)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-on-primary)', fontSize: 13, lineHeight: 1,
        transition: 'var(--transition-interactive)',
      }}>{checked ? '✓' : ''}</span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-primary)' }}>{label}</span>
        {description ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{description}</span> : null}
      </span>
    </label>
  );
}
