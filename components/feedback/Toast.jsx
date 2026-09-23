import React from 'react';

const TONES = {
  success: ['var(--surface-brand-subtle)', 'var(--color-primary)', 'var(--text-success)'],
  info: ['var(--surface-info-subtle)', 'var(--status-info)', 'var(--blue-70)'],
  warning: ['var(--surface-warning-subtle)', 'var(--status-warning)', 'var(--text-warning)'],
  danger: ['var(--surface-danger-subtle)', 'var(--status-danger)', 'var(--text-danger)'],
};

export function Toast({ tone = 'success', title, message, action, onDismiss, style }) {
  const [bg, bar, fg] = TONES[tone] || TONES.success;
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
      background: bg, borderLeft: '3px solid ' + bar, borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-5)', boxShadow: 'var(--shadow-300)', fontFamily: 'var(--font-sans)', maxWidth: 420, ...style,
    }}>
      <div style={{ flex: 1 }}>
        {title ? <div style={{ fontSize: 'var(--font-size-300)', fontWeight: 'var(--font-weight-semibold)', color: fg }}>{title}</div> : null}
        {message ? <div style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-secondary)', marginTop: 2 }}>{message}</div> : null}
      </div>
      {action}
      {onDismiss ? <button onClick={onDismiss} aria-label="Close" style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: 16, lineHeight: 1 }}>×</button> : null}
    </div>
  );
}
