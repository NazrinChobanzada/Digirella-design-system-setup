import React from 'react';

export function Switch({ label, checked = false, disabled = false, onChange, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'var(--font-sans)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{
        width: 44, height: 26, borderRadius: 'var(--radius-pill)', padding: 3, flex: '0 0 44px',
        background: checked ? 'var(--color-primary)' : 'var(--neutral-30)',
        transition: 'background-color var(--duration-fast) var(--ease-standard)',
        display: 'flex', justifyContent: checked ? 'flex-end' : 'flex-start',
      }}>
        <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-circle)', background: 'var(--neutral-00)', boxShadow: 'var(--shadow-100)' }} />
      </span>
      {label ? <span style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-primary)' }}>{label}</span> : null}
    </label>
  );
}
