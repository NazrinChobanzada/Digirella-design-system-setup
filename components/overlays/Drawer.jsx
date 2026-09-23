import React from 'react';

export function Drawer({ open = false, side = 'right', width = 420, title, description, onClose, footer, children }) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  const horizontal = side === 'left' || side === 'right';
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'var(--surface-overlay)', zIndex: 90, display: 'flex', justifyContent: side === 'left' ? 'flex-start' : 'flex-end', alignItems: side === 'bottom' ? 'flex-end' : 'stretch' }}>
      <aside role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--surface-card)', boxShadow: 'var(--shadow-400)', display: 'flex', flexDirection: 'column',
        width: horizontal ? width : '100%', maxWidth: '100%',
        maxHeight: side === 'bottom' ? '80vh' : '100%',
        borderRadius: side === 'bottom' ? 'var(--radius-lg) var(--radius-lg) 0 0' : side === 'right' ? 'var(--radius-lg) 0 0 var(--radius-lg)' : '0 var(--radius-lg) var(--radius-lg) 0',
        fontFamily: 'var(--font-sans)',
      }}>
        <header style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', padding: 'var(--space-6) var(--space-7)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--type-heading-size)', fontWeight: 'var(--type-heading-weight)' }}>{title}</div>
            {description ? <div style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-secondary)', marginTop: 2 }}>{description}</div> : null}
          </div>
          <button onClick={onClose} aria-label="Close" style={{ width: 32, height: 32, border: 0, borderRadius: 'var(--radius-circle)', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1 }}>×</button>
        </header>
        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-7)' }}>{children}</div>
        {footer ? <footer style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', padding: 'var(--space-6) var(--space-7)', borderTop: '1px solid var(--border-subtle)' }}>{footer}</footer> : null}
      </aside>
    </div>
  );
}
