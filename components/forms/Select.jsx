import React from 'react';

export function Select({ label, hint, error, options = [], id, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'select';
  const selectId = id || autoId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={selectId} style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</label> : null}
      <div style={{ position: 'relative' }}>
        <select
          id={selectId} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', width: '100%', minHeight: 38,
            padding: '8px var(--space-8) 8px var(--space-4)',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', color: 'var(--text-primary)',
            background: disabled ? 'var(--surface-disabled)' : 'var(--surface-card)',
            border: '1px solid ' + (error ? 'var(--border-danger)' : focus ? 'var(--border-focus)' : 'var(--border-control)'),
            borderRadius: 'var(--radius-sm)', outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: focus && !error ? '0 0 0 3px var(--green-05)' : 'none',
          }}
          {...rest}
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ position: 'absolute', right: 'var(--space-4)', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>
          <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-danger)' }}>{error}</span>
        : hint ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{hint}</span> : null}
    </div>
  );
}
