import React from 'react';

export function Input({ label, hint, error, prefix, suffix, id, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'input';
  const inputId = id || autoId;
  const borderColor = error ? 'var(--border-danger)' : focus ? 'var(--border-focus)' : 'var(--border-control)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={inputId} style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)', color: 'var(--text-primary)' }}>{label}</label> : null}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        background: disabled ? 'var(--surface-disabled)' : 'var(--surface-card)',
        border: '1px solid ' + borderColor, borderRadius: 'var(--radius-sm)',
        padding: '0 var(--space-4)', minHeight: 38,
        boxShadow: focus && !error ? '0 0 0 3px var(--green-05)' : 'none',
        transition: 'var(--transition-interactive)',
      }}>
        {prefix ? <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-300)' }}>{prefix}</span> : null}
        <input
          id={inputId} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', font: 'inherit', fontSize: 'var(--font-size-300)', color: 'var(--text-primary)', padding: '8px 0', minWidth: 0 }}
          {...rest}
        />
        {suffix ? <span style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-300)' }}>{suffix}</span> : null}
      </div>
      {error ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-danger)' }}>{error}</span>
        : hint ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{hint}</span> : null}
    </div>
  );
}
