'use client';

import { useEffect, useRef } from 'react';

interface GradientDotsBackgroundProps {
  dotSize?: number;
  spacing?: number;
  duration?: number;
  colorCycleDuration?: number;
  backgroundColor?: string;
}

export default function GradientDotsBackground({
  dotSize = 8,
  spacing = 10,
  duration = 30,
  colorCycleDuration = 6,
  backgroundColor = '#ffffff',
}: GradientDotsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hexSpacing = spacing * 1.732; // Hexagonal spacing calculation

  useEffect(() => {
    // Create keyframes for animation if they don't exist
    if (document.getElementById('gradient-dots-keyframes')) return;

    const style = document.createElement('style');
    style.id = 'gradient-dots-keyframes';
    style.textContent = `
      @keyframes gradientDotsMove {
        0% {
          background-position: 0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 800% 400%, 1000% -400%, -1200% -600%, 400% ${hexSpacing}px;
        }
        100% {
          background-position: 0px 0px, ${spacing / 2}px ${hexSpacing / 2}px, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
        }
      }
      @keyframes gradientDotsHue {
        0% {
          filter: hue-rotate(0deg);
        }
        100% {
          filter: hue-rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById('gradient-dots-keyframes');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, [spacing, hexSpacing]);

  return (
    <>
      <div
        ref={containerRef}
        className="gradient-dots-background"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
            radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
            radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.25), transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.25), transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.25), transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 0, 255, 0.25), transparent 60%)
          `,
          opacity: 0.75,
          backgroundSize: `
            ${spacing}px ${hexSpacing}px,
            ${spacing}px ${hexSpacing}px,
            200% 200%,
            200% 200%,
            200% 200%,
            200% ${hexSpacing}px
          `,
          backgroundPosition: `
            0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
            0% 0%,
            0% 0%,
            0% 0%,
            0px 0px
          `,
          animation: `gradientDotsMove ${duration}s linear infinite, gradientDotsHue ${colorCycleDuration}s linear infinite`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30px',
          background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}

