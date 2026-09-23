import React from 'react';

export function MultiSelect({ label, hint, error, options = [], value = [], display = 'tags', placeholder = 'Select…', maxVisibleTags = 3, onChange, style }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const ref = React.useRef(null);

  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const toggle = (v) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange && onChange(next);
  };
  const label_ = (v) => (options.find((o) => o.value === v) || {}).label || v;
  const list = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  const overflow = value.length - maxVisibleTags;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', position: 'relative', ...style }}>
      {label ? <label style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</label> : null}
      <div onClick={() => setOpen(true)} style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap', minHeight: 38,
        background: 'var(--surface-card)', borderRadius: 'var(--radius-sm)', padding: '5px var(--space-4)', cursor: 'text',
        border: '1px solid ' + (error ? 'var(--border-danger)' : open ? 'var(--border-focus)' : 'var(--border-control)'),
        boxShadow: open && !error ? '0 0 0 3px var(--green-05)' : 'none', transition: 'var(--transition-interactive)',
      }}>
        {display === 'tags' ? (
          <>
            {value.slice(0, maxVisibleTags).map((v) => (
              <span key={v} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)', border: '1px solid var(--color-primary-border)', borderRadius: 'var(--radius-xs)', padding: '3px 8px', fontSize: 'var(--font-size-200)', fontWeight: 500 }}>
                {label_(v)}
                <span onClick={(e) => { e.stopPropagation(); toggle(v); }} style={{ cursor: 'pointer', opacity: 0.7 }}>×</span>
              </span>
            ))}
            {overflow > 0 ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-secondary)' }}>+{overflow} more</span> : null}
          </>
        ) : value.length ? (
          <span style={{ fontSize: 'var(--font-size-300)' }}>{value.length} selected</span>
        ) : null}
        {value.length === 0 ? <span style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-tertiary)' }}>{placeholder}</span> : null}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginLeft: 'auto', color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}>
          <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open ? (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 40, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-300)', padding: 'var(--space-2)', maxHeight: 260, overflow: 'auto' }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" style={{ width: '100%', border: 0, borderBottom: '1px solid var(--border-subtle)', outline: 'none', padding: '8px var(--space-4)', fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', marginBottom: 'var(--space-2)' }} />
          {list.length === 0 ? <div style={{ padding: 'var(--space-4)', fontSize: 'var(--font-size-300)', color: 'var(--text-tertiary)' }}>No matches</div> : null}
          {list.map((o) => (
            <label key={o.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: '9px var(--space-4)', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: 'var(--font-size-300)' }}>
              <input type="checkbox" checked={value.includes(o.value)} onChange={() => toggle(o.value)} style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }} />
              {o.label}
              {o.meta ? <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{o.meta}</span> : null}
            </label>
          ))}
        </div>
      ) : null}
      {error ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-danger)' }}>{error}</span>
        : hint ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{hint}</span> : null}
    </div>
  );
}
