import { useState, useEffect, useRef } from 'react';

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
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const target = scrollRef.current;
        const scrollLeft = target.scrollLeft;
        const scrollWidth = target.scrollWidth;
        const clientWidth = target.clientWidth;
        
        setShowLeftFade(scrollLeft > 10);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    // Check initial state
    checkScroll();
    
    // Check on resize
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tags]);

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;
    
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        .tag-filter-container {
          width: 100%;
          padding: 0;
          position: relative;
        }

        .tag-filter-wrapper {
          position: relative;
        }

        .tag-filter-scroll {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.5rem 1rem;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .tag-filter-scroll::-webkit-scrollbar {
          display: none;
        }

        .tag-filter-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 0;
        }

        .tag-filter-arrow {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #000;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .tag-filter-arrow:hover {
          background: #FFF4E5;
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .tag-filter-arrow:active {
          transform: scale(0.95);
        }

        .tag-filter-arrow.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .tag-filter-arrow svg {
          width: 12px;
          height: 12px;
          stroke: #000;
          stroke-width: 2;
          fill: none;
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
        <div className="tag-filter-wrapper">
          <div 
            ref={scrollRef}
            className="tag-filter-scroll"
            onScroll={handleScroll}
          >
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
          <div className="tag-filter-buttons">
            <div 
              className={`tag-filter-arrow ${!showLeftFade ? 'hidden' : ''}`}
              onClick={scrollLeft} 
              role="button" 
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div 
              className={`tag-filter-arrow ${!showRightFade ? 'hidden' : ''}`}
              onClick={scrollRight} 
              role="button" 
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

