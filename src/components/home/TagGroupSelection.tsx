import { useState } from 'react';

interface TagGroupSelectionProps {
  onFilterSelect?: (filter: string | null) => void;
}

interface ChipFilter {
  id: string;
  label: string;
  filterTag?: string; // Maps to product tags
}

// Public homepage filters (single grouped row, multi-select)
const filters: ChipFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'for-him', label: 'For Him', filterTag: 'gifts-for-him' },
  { id: 'for-her', label: 'For Her', filterTag: 'gifts-for-her' },
  { id: 'under-50', label: 'Under $50', filterTag: 'under-50' },
  { id: 'vibes', label: 'Vibes', filterTag: 'home-decor' },
  { id: 'stocking-stuffers', label: 'Stocking Stuffers', filterTag: 'under-30' },
];

export default function TagGroupSelection({ onFilterSelect }: TagGroupSelectionProps) {
  // Multi-select state (store filter ids except "all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isAllActive = selectedIds.size === 0;

  const handleSelect = (f: ChipFilter) => {
    if (f.id === 'all') {
      const cleared = new Set<string>();
      setSelectedIds(cleared);
      onFilterSelect?.(null);
      window.dispatchEvent(new CustomEvent('filtersSelected', { detail: { filters: [] } }));
      return;
    }
    const next = new Set(selectedIds);
    if (next.has(f.id)) next.delete(f.id);
    else next.add(f.id);
    setSelectedIds(next);

    const selectedTags = Array.from(next)
      .map(id => filters.find(ff => ff.id === id)?.filterTag || id)
      .filter(Boolean)
      .map(s => String(s).toLowerCase());
    onFilterSelect?.(selectedTags.length ? selectedTags.join(',') : null);
    window.dispatchEvent(new CustomEvent('filtersSelected', { detail: { filters: selectedTags } }));
  };

  return (
    <>
      <style>{`
        .tg-container { width: 100%; display: flex; justify-content: center; padding: 1.5rem 0 1.75rem; overflow: visible; }
        /* Mobile: allow wrapping to next line */
        .tg-scroll { display: flex; flex-wrap: wrap; gap: 0.5rem; overflow: visible; padding: 0.5rem 1rem; scrollbar-width: none; -ms-overflow-style: none; }
        .tg-scroll::-webkit-scrollbar { display: none; }

        .tg-chip { position: relative; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 0 12px; border-radius: 9999px; font-family: "DM Sans", sans-serif; font-weight: 600; font-size: 0.75rem; color: #111827; background: #fff; border: 1px solid #E5E7EB; transition: all .15s ease; cursor: pointer; }
        .tg-chip:hover { transform: translateY(-1px); }

        /* Active look resembling 21st.dev tag group selection */
        .tg-chip.active { color: #111827; background: #fff; border-color: transparent; box-shadow: 0 0 0 1px rgba(0,0,0,0.8); }
        .tg-chip.active::before { content: ""; position: absolute; inset: -2px; border-radius: 9999px; padding: 2px; background: linear-gradient(135deg, #fa2284 0%, #ff8b00 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .tg-chip.active::after { content: ""; position: absolute; inset: 1px; border-radius: 9999px; background: rgba(250,34,132,0.06); }

        @media (min-width: 768px) {
          /* Desktop: single row with horizontal scroll */
          .tg-scroll { flex-wrap: wrap; gap: 0.625rem; padding: 0.75rem 1.5rem; overflow: visible; }
          .tg-chip { height: 34px; padding: 0 14px; font-size: 0.8rem; }
        }
      `}</style>
      <div className="tg-container">
        <div className="tg-scroll">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`tg-chip ${
                (f.id === 'all' && isAllActive) || (f.id !== 'all' && selectedIds.has(f.id)) ? 'active' : ''
              }`}
              onClick={() => handleSelect(f)}
              aria-pressed={(f.id === 'all' && isAllActive) || (f.id !== 'all' && selectedIds.has(f.id))}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
