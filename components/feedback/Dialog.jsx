import React from 'react';

export function Dialog({ open = false, title, subtitle, description, onClose, onRequestClose, footer, dividedFooter = false, showClose = false, children, width = 480, initialFocusRef }) {
  const panelRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  const close = React.useCallback(() => {
    if (onRequestClose) { if (onRequestClose() === false) return; }
    onClose && onClose();
  }, [onClose, onRequestClose]);

  React.useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement;
    const root = document.getElementById('root') || document.body.firstElementChild;
    if (root && !root.contains(panelRef.current)) root.setAttribute('aria-hidden', 'true');

    const focusables = () => Array.from(panelRef.current ? panelRef.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])') : []);
    const target = (initialFocusRef && initialFocusRef.current) || focusables()[0] || panelRef.current;
    if (target && target.focus) target.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (list.length === 0) { e.preventDefault(); return; }
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      if (root) root.removeAttribute('aria-hidden');
      const back = returnFocusRef.current;
      if (back && back.focus) back.focus();
    };
  }, [open, close, initialFocusRef]);

  if (!open) return null;

  const padded = { padding: 'var(--space-8)' };
  return (
    <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'var(--surface-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', zIndex: 100 }}>
      <div
        ref={panelRef}
        role="dialog" aria-modal="true" tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width, maxHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-400)', fontFamily: 'var(--font-sans)', outline: 'none',
        }}
      >
        {title || showClose ? (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', padding: 'var(--space-8) var(--space-8) 0' }}>
            <div style={{ flex: 1 }}>
              {title ? <div style={{ fontSize: 'var(--type-heading-size)', fontWeight: 'var(--type-heading-weight)', color: 'var(--text-primary)' }}>{title}</div> : null}
              {subtitle ? <div style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-secondary)', marginTop: 2 }}>{subtitle}</div> : null}
            </div>
            {showClose ? (
              <button type="button" onClick={close} aria-label="Close" style={{ width: 32, height: 32, border: 0, borderRadius: 'var(--radius-circle)', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 18, lineHeight: 1 }}>×</button>
            ) : null}
          </div>
        ) : null}

        <div style={{ flex: 1, overflow: 'auto', ...padded, paddingTop: title || showClose ? 'var(--space-3)' : 'var(--space-8)', paddingBottom: footer && dividedFooter ? 'var(--space-6)' : 'var(--space-3)' }}>
          {description ? <div style={{ fontSize: 'var(--font-size-300)', lineHeight: 'var(--line-height-normal)', color: 'var(--text-secondary)' }}>{description}</div> : null}
          {children ? <div style={{ marginTop: description ? 'var(--space-6)' : 0 }}>{children}</div> : null}
        </div>

        {footer ? (
          <div style={{
            display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end',
            padding: dividedFooter ? 'var(--space-6) var(--space-8)' : '0 var(--space-8) var(--space-8)',
            borderTop: dividedFooter ? '1px solid var(--border-subtle)' : 'none',
          }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
