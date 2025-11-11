import { useState } from 'react';

interface TagGroupSelectionProps {
  onFilterSelect?: (filter: string | null) => void;
}

interface ChipFilter {
  id: string;
  label: string;
  filterTag?: string; // Maps to product tags
}

const PRICE_FILTERS: ChipFilter[] = [
  { id: 'price-under-20', label: 'under $20', filterTag: 'under-20' },
  { id: 'price-20-50', label: '$20-$50', filterTag: '20-50' },
  { id: 'price-50-100', label: '$50-$100', filterTag: '50-100' },
  { id: 'price-over-100', label: 'over $100', filterTag: 'over-100' },
];

const RECIPIENT_FILTERS: ChipFilter[] = [
  { id: 'rcp-for-him', label: 'for him', filterTag: 'gifts-for-him' },
  { id: 'rcp-for-her', label: 'for her', filterTag: 'gifts-for-her' },
  { id: 'rcp-for-kids', label: 'for kids', filterTag: 'gifts-for-kids' },
  { id: 'rcp-for-everyone', label: 'for everyone', filterTag: 'for-everyone' },
];

export default function TagGroupSelection({ onFilterSelect }: TagGroupSelectionProps) {
  // Multi-select per group
  const [selectedPrice, setSelectedPrice] = useState<Set<string>>(new Set());
  const [selectedRecipient, setSelectedRecipient] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const emitTags = (price: Set<string>, recipient: Set<string>) => {
    const mapFilterTags = (ids: Set<string>, defs: ChipFilter[]) =>
      Array.from(ids)
        .map(id => defs.find(d => d.id === id)?.filterTag)
        .filter(Boolean) as string[];

    const tags = [
      ...mapFilterTags(price, PRICE_FILTERS),
      ...mapFilterTags(recipient, RECIPIENT_FILTERS),
    ].map(t => t.toLowerCase());

    onFilterSelect?.(tags.length ? tags.join(',') : null);
    window.dispatchEvent(new CustomEvent('filtersSelected', { detail: { filters: tags } }));
  };

  const onPrice = (id: string) => {
    const next = toggle(selectedPrice, id);
    setSelectedPrice(next);
    emitTags(next, selectedRecipient);
  };
  const onRecipient = (id: string) => {
    const next = toggle(selectedRecipient, id);
    setSelectedRecipient(next);
    emitTags(selectedPrice, next);
  };

  return (
    <>
      <style>{`
        .tg-container { width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem 0 1.75rem; overflow: visible; }
        .tg-section { width: 100%; max-width: 900px; padding: 0 1rem; margin-bottom: 0.5rem; display: flex; justify-content: center; }
        /* Mobile: allow wrapping to next line */
        .tg-scroll { display: flex; flex-wrap: wrap; gap: 0.5rem; overflow: visible; padding: 0.5rem 0; scrollbar-width: none; -ms-overflow-style: none; justify-content: center; }
        .tg-scroll::-webkit-scrollbar { display: none; }

        .tg-chip { position: relative; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 0 12px; border-radius: 9999px; font-family: "DM Sans", sans-serif; font-weight: 600; font-size: 0.75rem; color: #111827; background: #fff; border: 1px solid #E5E7EB; transition: all .15s ease; cursor: pointer; }
        .tg-chip:hover { transform: translateY(-1px); }

        /* Active look resembling 21st.dev tag group selection */
        .tg-chip.active { color: #111827; background: #fff; border-color: transparent; box-shadow: 0 0 0 1px rgba(0,0,0,0.8); }
        .tg-chip.active::before { content: ""; position: absolute; inset: -2px; border-radius: 9999px; padding: 2px; background: linear-gradient(135deg, #fa2284 0%, #ff8b00 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .tg-chip.active::after { content: ""; position: absolute; inset: 1px; border-radius: 9999px; background: rgba(250,34,132,0.06); }

        @media (min-width: 768px) {
          .tg-section { padding: 0 1.5rem; justify-content: center; }
          .tg-scroll { flex-wrap: wrap; gap: 0.625rem; padding: 0.5rem 0; overflow: visible; justify-content: center; }
          .tg-chip { height: 34px; padding: 0 14px; font-size: 0.8rem; }
        }
      `}</style>
      <div className="tg-container">
        <div className="tg-section">
          <div className="tg-scroll">
            {PRICE_FILTERS.map(f => (
              <button
                key={f.id}
                className={`tg-chip ${selectedPrice.has(f.id) ? 'active' : ''}`}
                onClick={() => onPrice(f.id)}
                aria-pressed={selectedPrice.has(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tg-section">
          <div className="tg-scroll">
            {RECIPIENT_FILTERS.map(f => (
              <button
                key={f.id}
                className={`tg-chip ${selectedRecipient.has(f.id) ? 'active' : ''}`}
                onClick={() => onRecipient(f.id)}
                aria-pressed={selectedRecipient.has(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
