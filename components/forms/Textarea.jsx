import React from 'react';

export function Textarea({ label, hint, error, rows = 4, maxLength, value = '', id, disabled = false, onChange, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : 'ta';
  const tid = id || autoId;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={tid} style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</label> : null}
      <textarea
        id={tid} rows={rows} maxLength={maxLength} value={value} disabled={disabled} onChange={onChange}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          resize: 'vertical', width: '100%', outline: 'none',
          background: disabled ? 'var(--surface-disabled)' : 'var(--surface-card)',
          border: '1px solid ' + (error ? 'var(--border-danger)' : focus ? 'var(--border-focus)' : 'var(--border-control)'),
          borderRadius: 'var(--radius-sm)', padding: 'var(--space-3) var(--space-4)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', lineHeight: 'var(--line-height-normal)', color: 'var(--text-primary)',
          boxShadow: focus && !error ? '0 0 0 3px var(--green-05)' : 'none', transition: 'var(--transition-interactive)',
        }}
        {...rest}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <span style={{ fontSize: 'var(--font-size-200)', color: error ? 'var(--text-danger)' : 'var(--text-tertiary)' }}>{error || hint}</span>
        {maxLength ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{String(value).length}/{maxLength}</span> : null}
      </div>
    </div>
  );
}
