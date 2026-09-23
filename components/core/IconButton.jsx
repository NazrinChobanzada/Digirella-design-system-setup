import React from 'react';

const SIZES = { small: 30, medium: 40, large: 48 };

export function IconButton({ label, size = 'medium', variant = 'ghost', disabled = false, onClick, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const d = SIZES[size] || SIZES.medium;
  const base = variant === 'solid'
    ? { background: 'var(--color-primary)', color: 'var(--color-on-primary)' }
    : { background: 'transparent', color: 'var(--text-secondary)' };
  return (
    <button
      type="button" aria-label={label} disabled={disabled} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: variant === 'outline' ? '1px solid var(--border-default)' : '1px solid transparent',
        borderRadius: 'var(--radius-circle)', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-interactive)', ...base,
        ...(hover && !disabled ? { background: variant === 'solid' ? 'var(--color-primary-hover)' : 'var(--surface-hover)', color: variant === 'solid' ? 'var(--color-on-primary)' : 'var(--text-primary)' } : null),
        ...(disabled ? { color: 'var(--text-disabled)' } : null),
        ...style,
      }}
      {...rest}
    >{children}</button>
  );
}
