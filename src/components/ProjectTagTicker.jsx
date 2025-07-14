import { useMemo } from 'react';
import './ProjectDetail.css';

export default function ProjectTagTicker({ tags = [] }) {
    // Repeat tags for smooth infinite scroll
    const getStyle = (tag) => {
      if (typeof tag !== 'string') return;
      const lower = tag.toLowerCase();
      if (lower.includes('react')) return 'bg-blue-400 text-dark';
      if (lower.includes('python') || 
      (lower.includes('java script'))) return 'bg-yellow-300 text-dark';
      if (lower.includes('c++')) return 'bg-white text-dark';
      if (lower.includes('vite')) return 'bg-purple-400 text-dark';
      if (lower.includes('tailwind')) return 'bg-teal-400 text-dark';
      return 'bg-green-400 text-dark';
    };

      // Shuffle and repeat tags
      const repeatedTags = useMemo(() => {
        const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
        return [
          ...shuffle(tags),
          ...shuffle(tags),
          ...shuffle(tags),
          ...shuffle(tags),
        ];
      }, [tags]);

      const speedPerItem = 1.4; // seconds per tag (tweak to your liking)
      const duration = repeatedTags.length * speedPerItem;
  
    return (
      <div className="relative overflow-hidden bg-background h-12 max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto">
        <div className="absolute whitespace-nowrap animate-ticker flex items-center gap-8 px-4"
            style={{ animation: `ticker ${duration}s linear infinite` }}>
          {repeatedTags.map((tag, index) => (
            <div
              key={index}
              className={`rounded-full px-4 py-1 text-sm font-medium shadow-sm ${getStyle(tag)}`}

            >
              {tag}
            </div>
          ))}
        </div>
        {/* glow overlay on edges */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    );
  
  }
  
