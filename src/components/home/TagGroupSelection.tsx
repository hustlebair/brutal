import { useState } from 'react';

interface TagGroupSelectionProps {
  onFilterSelect?: (filter: string | null) => void;
}

interface ChipFilter {
  id: string;
  label: string;
  filterTag?: string; // Maps to product tags
}

// Homepage groups (mirroring admin)
const CATEGORY_OPTIONS: Array<{ id: string; label: string }> = [
  { id: 'cat-cool-tech', label: 'Cool Tech' },
  { id: 'cat-home-stuff', label: 'Home Stuff' },
  { id: 'cat-self-care', label: 'Self Care' },
  { id: 'cat-lol-gifts', label: 'LOL Gifts' },
  { id: 'cat-adventure', label: 'Adventure' },
  { id: 'cat-seasonal', label: 'Seasonal' },
];

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

const CONTEXT_FILTERS: ChipFilter[] = [
  { id: 'ctx-viral', label: 'viral', filterTag: 'viral' },
  { id: 'ctx-funny', label: 'funny', filterTag: 'funny' },
  { id: 'ctx-aesthetic', label: 'aesthetic', filterTag: 'aesthetic' },
  { id: 'ctx-useful', label: 'useful', filterTag: 'useful' },
  { id: 'ctx-birthday', label: 'birthday', filterTag: 'birthday' },
  { id: 'ctx-christmas', label: 'christmas', filterTag: 'christmas' },
  { id: 'ctx-valentines', label: 'valentines', filterTag: 'valentines' },
  { id: 'ctx-anniversary', label: 'anniversary', filterTag: 'anniversary' },
  { id: 'ctx-mothers-day', label: 'mothers day', filterTag: 'mothers-day' },
  { id: 'ctx-fathers-day', label: 'fathers day', filterTag: 'fathers-day' },
  { id: 'ctx-white-elephant', label: 'white elephant', filterTag: 'white-elephant' },
];

export default function TagGroupSelection({ onFilterSelect }: TagGroupSelectionProps) {
  // Multi-select per group
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedPrice, setSelectedPrice] = useState<Set<string>>(new Set());
  const [selectedRecipient, setSelectedRecipient] = useState<Set<string>>(new Set());
  const [selectedContext, setSelectedContext] = useState<Set<string>>(new Set());

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const emitTags = (price: Set<string>, recipient: Set<string>, context: Set<string>) => {
    const mapFilterTags = (ids: Set<string>, defs: ChipFilter[]) =>
      Array.from(ids)
        .map(id => defs.find(d => d.id === id)?.filterTag)
        .filter(Boolean) as string[];

    const tags = [
      ...mapFilterTags(price, PRICE_FILTERS),
      ...mapFilterTags(recipient, RECIPIENT_FILTERS),
      ...mapFilterTags(context, CONTEXT_FILTERS),
    ].map(t => t.toLowerCase());

    onFilterSelect?.(tags.length ? tags.join(',') : null);
    window.dispatchEvent(new CustomEvent('filtersSelected', { detail: { filters: tags } }));
  };

  const onCategory = (id: string) => {
    const next = toggle(selectedCategories, id);
    setSelectedCategories(next);
    // Categories are not part of product tag filtering on homepage (display-only/may be used later)
  };
  const onPrice = (id: string) => {
    const next = toggle(selectedPrice, id);
    setSelectedPrice(next);
    emitTags(next, selectedRecipient, selectedContext);
  };
  const onRecipient = (id: string) => {
    const next = toggle(selectedRecipient, id);
    setSelectedRecipient(next);
    emitTags(selectedPrice, next, selectedContext);
  };
  const onContext = (id: string) => {
    const next = toggle(selectedContext, id);
    setSelectedContext(next);
    emitTags(selectedPrice, selectedRecipient, next);
  };

  return (
    <>
      <style>{`
        .tg-container { width: 100%; display: flex; justify-content: center; padding: 1.5rem 0 1.75rem; overflow: visible; }
        .tg-section { width: 100%; max-width: 1100px; padding: 0 1rem; margin-bottom: 0.5rem; }
        .tg-title { font-family: "DM Sans", sans-serif; font-weight: 800; font-size: 0.75rem; letter-spacing: 0.08em; color: #111827; opacity: 0.8; margin: 0.25rem 0; }
        /* Mobile: allow wrapping to next line */
        .tg-scroll { display: flex; flex-wrap: wrap; gap: 0.5rem; overflow: visible; padding: 0.5rem 0; scrollbar-width: none; -ms-overflow-style: none; }
        .tg-scroll::-webkit-scrollbar { display: none; }

        .tg-chip { position: relative; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 0 12px; border-radius: 9999px; font-family: "DM Sans", sans-serif; font-weight: 600; font-size: 0.75rem; color: #111827; background: #fff; border: 1px solid #E5E7EB; transition: all .15s ease; cursor: pointer; }
        .tg-chip:hover { transform: translateY(-1px); }

        /* Active look resembling 21st.dev tag group selection */
        .tg-chip.active { color: #111827; background: #fff; border-color: transparent; box-shadow: 0 0 0 1px rgba(0,0,0,0.8); }
        .tg-chip.active::before { content: ""; position: absolute; inset: -2px; border-radius: 9999px; padding: 2px; background: linear-gradient(135deg, #fa2284 0%, #ff8b00 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
        .tg-chip.active::after { content: ""; position: absolute; inset: 1px; border-radius: 9999px; background: rgba(250,34,132,0.06); }

        @media (min-width: 768px) {
          /* Desktop: single row with horizontal scroll */
          .tg-section { padding: 0 1.5rem; }
          .tg-scroll { flex-wrap: wrap; gap: 0.625rem; padding: 0.5rem 0; overflow: visible; }
          .tg-chip { height: 34px; padding: 0 14px; font-size: 0.8rem; }
        }
      `}</style>
      <div className="tg-container">
        <div className="tg-section">
          <div className="tg-title">CATEGORIES</div>
          <div className="tg-scroll">
            {CATEGORY_OPTIONS.map(c => (
              <button
                key={c.id}
                className={`tg-chip ${selectedCategories.has(c.id) ? 'active' : ''}`}
                onClick={() => onCategory(c.id)}
                aria-pressed={selectedCategories.has(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tg-section">
          <div className="tg-title">PRICE</div>
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
          <div className="tg-title">RECIPIENT</div>
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
        <div className="tg-section">
          <div className="tg-title">CONTEXT</div>
          <div className="tg-scroll">
            {CONTEXT_FILTERS.map(f => (
              <button
                key={f.id}
                className={`tg-chip ${selectedContext.has(f.id) ? 'active' : ''}`}
                onClick={() => onContext(f.id)}
                aria-pressed={selectedContext.has(f.id)}
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
