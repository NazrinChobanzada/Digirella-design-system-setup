import React from 'react';

const TONES = {
  neutral: ['var(--surface-sunken)', 'var(--text-secondary)'],
  success: ['var(--surface-brand-subtle)', 'var(--text-success)'],
  info: ['var(--surface-info-subtle)', 'var(--blue-70)'],
  warning: ['var(--surface-warning-subtle)', 'var(--text-warning)'],
  danger: ['var(--surface-danger-subtle)', 'var(--text-danger)'],
  brand: ['var(--color-primary)', 'var(--color-on-primary)'],
};

export function Badge({ tone = 'neutral', children, style, ...rest }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
      background: bg, color: fg, fontFamily: 'var(--font-sans)',
      fontSize: 'var(--font-size-200)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 1,
      padding: '5px 10px', borderRadius: 'var(--radius-xs)', ...style,
    }} {...rest}>{children}</span>
  );
}
