import React from 'react';

const VARIANTS = {
  primary: { background: 'var(--color-primary)', color: 'var(--color-on-primary)', border: '1px solid transparent' },
  secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
  subtle: { background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)', border: '1px solid transparent' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  danger: { background: 'var(--status-danger)', color: 'var(--text-inverse)', border: '1px solid transparent' },
};
const HOVER = {
  primary: 'var(--color-primary-hover)',
  secondary: 'var(--surface-hover)',
  subtle: 'var(--color-primary-subtle-hover)',
  ghost: 'var(--surface-hover)',
  danger: 'var(--red-60)',
};
const SIZES = {
  small: { padding: '6px 14px', fontSize: 'var(--font-size-200)', minHeight: 30 },
  medium: { padding: '10px 20px', fontSize: 'var(--font-size-300)', minHeight: 40 },
  large: { padding: '14px 28px', fontSize: 'var(--font-size-400)', minHeight: 50 },
};

export function Button({ variant = 'primary', size = 'medium', fullWidth = false, disabled = false, iconStart = null, iconEnd = null, type = 'button', onClick, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.medium;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)',
        width: fullWidth ? '100%' : undefined,
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 1,
        borderRadius: 'var(--radius-control)', cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-interactive)',
        ...v, ...s,
        ...(hover && !disabled ? { background: HOVER[variant] } : null),
        ...(disabled ? { background: 'var(--surface-disabled)', color: 'var(--text-disabled)', border: '1px solid transparent' } : null),
        ...style,
      }}
      {...rest}
    >
      {iconStart}{children}{iconEnd}
    </button>
  );
}
