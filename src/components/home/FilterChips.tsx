import { useState } from 'react';

interface FilterChipsProps {
  onFilterSelect?: (filter: string | null) => void;
}

interface ChipFilter {
  id: string;
  label: string;
  filterTag?: string; // Maps to product tags
}

const filters: ChipFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'for-him', label: 'For Him', filterTag: 'gifts-for-him' },
  { id: 'for-her', label: 'For Her', filterTag: 'gifts-for-her' },
  { id: 'under-50', label: 'Under $50', filterTag: 'under-50' },
  { id: 'vibes', label: 'Vibes', filterTag: 'home-decor' },
  { id: 'stocking-stuffers', label: 'Stocking Stuffers', filterTag: 'under-30' },
];

export default function FilterChips({ onFilterSelect }: FilterChipsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleChipClick = (filter: ChipFilter) => {
    setActiveFilter(filter.id);
    
    // Dispatch event for Astro script to handle filtering
    const filterValue = filter.id === 'all' ? null : filter.filterTag || filter.id;
    onFilterSelect?.(filterValue);
    window.dispatchEvent(new CustomEvent('filterSelected', { 
      detail: { filter: filterValue } 
    }));
  };

  return (
    <>
      <style>{`
        .filter-chips-container {
          width: 100%;
          padding: 2.5rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .filter-chips-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding: 1rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          max-width: 100%;
        }

        .filter-chips-scroll::-webkit-scrollbar {
          display: none;
        }

        .filter-chip {
          flex-shrink: 0;
          height: auto;
          min-width: auto;
          width: auto;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 2px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          font-family: "DM Sans", sans-serif;
          white-space: nowrap;
        }

        .filter-chip:hover {
          transform: scale(1.05);
          border-color: #d1d5db;
        }

        .filter-chip.active {
          background: linear-gradient(135deg, #fa2284 0%, #ff8b00 100%);
          border-color: #fa2284;
          color: white;
        }

        .filter-chip.active:hover {
          transform: scale(1.05);
        }

        .filter-chip-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          line-height: 1;
        }

        .filter-chip.active .filter-chip-label {
          color: white;
        }

        @media (min-width: 768px) {
          .filter-chips-scroll {
            gap: 1.5rem;
            padding: 1rem 2rem;
          }

          .filter-chip {
            padding: 0.5rem 1.25rem;
          }

          .filter-chip-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
      <div className="filter-chips-container">
        <div className="filter-chips-scroll">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleChipClick(filter)}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              aria-label={`Filter by ${filter.label}`}
            >
              <span className="filter-chip-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

