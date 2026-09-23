import React from 'react';

export function Pagination({ page = 1, pageCount = 1, siblings = 1, onChange, style }) {
  const go = (p) => { if (p >= 1 && p <= pageCount && p !== page) onChange && onChange(p); };
  const pages = [];
  const push = (v) => pages.push(v);
  push(1);
  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);
  if (start > 2) push('…');
  for (let i = start; i <= end; i++) push(i);
  if (end < pageCount - 1) push('…');
  if (pageCount > 1) push(pageCount);

  const cell = (active, enabled = true) => ({
    minWidth: 34, height: 34, padding: '0 var(--space-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 'var(--radius-sm)', border: '1px solid ' + (active ? 'var(--color-primary)' : 'transparent'),
    background: active ? 'var(--color-primary)' : 'transparent',
    color: active ? 'var(--color-on-primary)' : enabled ? 'var(--text-primary)' : 'var(--text-disabled)',
    fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', fontWeight: active ? 600 : 500,
    cursor: enabled && !active ? 'pointer' : active ? 'default' : 'not-allowed',
    transition: 'var(--transition-interactive)',
  });

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', ...style }}>
      <button onClick={() => go(page - 1)} disabled={page === 1} style={{ ...cell(false, page > 1), border: '1px solid var(--border-default)' }}>‹</button>
      {pages.map((p, i) => p === '…'
        ? <span key={'e' + i} style={{ ...cell(false), cursor: 'default', color: 'var(--text-tertiary)' }}>…</span>
        : <button key={p} aria-current={p === page ? 'page' : undefined} onClick={() => go(p)} style={cell(p === page)}>{p}</button>
      )}
      <button onClick={() => go(page + 1)} disabled={page === pageCount} style={{ ...cell(false, page < pageCount), border: '1px solid var(--border-default)' }}>›</button>
    </nav>
  );
}
