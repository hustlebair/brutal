import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  onTagSelect?: (tag: string | null) => void;
}

// Helper to format tag for display
function formatTag(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function TagFilter({ tags, onTagSelect }: TagFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      onTagSelect?.(null);
      // Dispatch event for Astro script
      window.dispatchEvent(new CustomEvent('tagSelected', { detail: { tag: null } }));
    } else {
      setSelectedTag(tag);
      onTagSelect?.(tag);
      // Dispatch event for Astro script
      window.dispatchEvent(new CustomEvent('tagSelected', { detail: { tag } }));
    }
  };

  return (
    <>
      <style>{`
        .tag-filter-container {
          width: 100%;
          padding: 0 1rem;
        }

        .tag-filter-scroll {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.5rem 0;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #FCB55B transparent;
        }

        .tag-filter-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .tag-filter-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .tag-filter-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FEFEB6, #FCB55B, #FC3DB1);
          border-radius: 3px;
        }

        .tag-button {
          flex-shrink: 0;
          padding: 0.625rem 1.25rem;
          background: white;
          border: 2px solid #000;
          border-radius: 0.75rem;
          font-family: "DM Sans", sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #000;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tag-button:hover {
          background: #FFF4E5;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .tag-button.active {
          background: linear-gradient(to bottom, #FEFEB6, #FCB55B, #FC3DB1);
          color: #000;
          border-color: #FCB55B;
          box-shadow: 0 4px 12px rgba(252, 181, 91, 0.3);
        }

        .tag-button.active:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        @media (min-width: 768px) {
          .tag-filter-container {
            padding: 0 2rem;
          }

          .tag-button {
            font-size: 1rem;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
      <div className="tag-filter-container">
        <div className="tag-filter-scroll">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              data-tag={tag}
            >
              {formatTag(tag)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

