import { useMemo } from 'react';
import './ProjectDetail.css';

export default function ProjectTagTicker({ tags = [] }) {
    // Repeat tags for smooth infinite scroll
    const repeatedTags = [...tags, ...tags, ...tags, ...tags];
    const getColor = (tag) => {
      if (tag.toLowerCase().includes('react')) return 'text-blue-400';
      if (tag.toLowerCase().includes('python')) return 'text-yellow-300';
      if (tag.toLowerCase().includes('c++')) return 'text-white';
      if (tag.toLowerCase().includes('vite')) return 'text-purple-400';
      if (tag.toLowerCase().includes('tailwind')) return 'text-teal-400';
      return 'text-green-400';
    };
    
  
    return (
      <div className="relative overflow-hidden bg-dark border-t border-b border-gray-700 h-12 max-w-lg lg:max-w-xl xl:max-w-4xl mx-auto">
        <div className="absolute whitespace-nowrap animate-ticker flex items-center gap-8 px-4">
          {repeatedTags.map((tag, index) => (
            <div
              key={index}
              className={`text-sm font-mono uppercase px-3 last:border-none ${getColor(tag)}`}

            >
              {tag}
            </div>
          ))}
        </div>
        {/* glow overlay on edges */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-dark to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-dark to-transparent z-10" />
      </div>
    );
  
  }
  
