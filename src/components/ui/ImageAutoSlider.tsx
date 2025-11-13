'use client';

import React from 'react';

export interface ImageAutoSliderProps {
  images: string[];
  speed?: number; // Animation duration in seconds
  className?: string;
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images,
  speed = 20,
  className = ''
}) => {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right ${speed}s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className={`relative w-full overflow-hidden px-4 md:px-8 py-6 md:py-8 ${className}`}>
        <div className="scroll-container w-full">
          <div className="infinite-scroll flex gap-8 md:gap-10 lg:gap-12 w-max items-center">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl p-2 md:p-3"
              >
                <img
                  src={image}
                  alt={`Product image ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

