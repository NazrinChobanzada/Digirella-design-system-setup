import React from 'react';

const TONES = {
  success: ['var(--surface-brand-subtle)', 'var(--color-primary-border)', 'var(--text-success)', '✓'],
  info: ['var(--surface-info-subtle)', 'var(--blue-30)', 'var(--blue-70)', 'i'],
  warning: ['var(--surface-warning-subtle)', 'var(--amber-30)', 'var(--text-warning)', '!'],
  danger: ['var(--surface-danger-subtle)', 'var(--red-30)', 'var(--text-danger)', '×'],
};

export function Alert({ tone = 'info', title, children, action, onDismiss, style }) {
  const [bg, bd, fg, glyph] = TONES[tone] || TONES.info;
  return (
    <div role="alert" style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
      background: bg, border: '1px solid ' + bd, borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-5)', fontFamily: 'var(--font-sans)', ...style,
    }}>
      <span aria-hidden="true" style={{ color: fg, fontWeight: 700, lineHeight: 1.4 }}>{glyph}</span>
      <div style={{ flex: 1 }}>
        {title ? <div style={{ fontSize: 'var(--font-size-300)', fontWeight: 600, color: fg }}>{title}</div> : null}
        {children ? <div style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>{children}</div> : null}
        {action ? <div style={{ marginTop: 'var(--space-4)' }}>{action}</div> : null}
      </div>
      {onDismiss ? <button onClick={onDismiss} aria-label="Dismiss" style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 16, lineHeight: 1 }}>×</button> : null}
    </div>
  );
}
