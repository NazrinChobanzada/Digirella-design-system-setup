import React from 'react';

export function Combobox({ label, hint, options = [], value, placeholder = 'Search…', onChange, emptyText = 'No matches', style }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const selected = options.find((o) => o.value === value);
  const list = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  const pick = (o) => { onChange && onChange(o.value); setQuery(''); setOpen(false); };
  const key = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && open && list[active]) { e.preventDefault(); pick(list[active]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', position: 'relative', ...style }}>
      {label ? <label style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</label> : null}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minHeight: 38,
        background: 'var(--surface-card)', borderRadius: 'var(--radius-sm)', padding: '0 var(--space-4)',
        border: '1px solid ' + (open ? 'var(--border-focus)' : 'var(--border-control)'),
        boxShadow: open ? '0 0 0 3px var(--green-05)' : 'none', transition: 'var(--transition-interactive)',
      }}>
        <input
          role="combobox" aria-expanded={open} aria-autocomplete="list"
          value={open ? query : (selected ? selected.label : '')}
          placeholder={selected ? selected.label : placeholder}
          onFocus={() => setOpen(true)} onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0); }} onKeyDown={key}
          style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', color: 'var(--text-primary)', padding: '8px 0', minWidth: 0 }}
        />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}>
          <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open ? (
        <ul role="listbox" style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 40, margin: 0,
          listStyle: 'none', padding: 'var(--space-2)', maxHeight: 240, overflow: 'auto',
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-300)',
        }}>
          {list.length === 0 ? <li style={{ padding: 'var(--space-4)', fontSize: 'var(--font-size-300)', color: 'var(--text-tertiary)' }}>{emptyText}</li> : null}
          {list.map((o, i) => (
            <li key={o.value} role="option" aria-selected={o.value === value}
              onMouseEnter={() => setActive(i)} onClick={() => pick(o)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)',
                padding: '9px var(--space-4)', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
                fontSize: 'var(--font-size-300)', color: 'var(--text-primary)',
                background: i === active ? 'var(--surface-hover)' : 'transparent',
              }}>
              <span>{o.label}</span>
              {o.value === value ? <span style={{ color: 'var(--color-primary)' }}>✓</span> : o.meta ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{o.meta}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
      {hint ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{hint}</span> : null}
    </div>
  );
}
