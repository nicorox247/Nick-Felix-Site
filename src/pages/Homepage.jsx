import { useEffect, useRef, useState } from 'react';
import RunnerCanvas from '../components/RunnerCanvas';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png';

export default function Homepage() {
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef(null);

    // Custom slow scroll
    const slowScrollTo = (targetY, duration = 1500) => {
      const startY = window.scrollY;
      const startTime = performance.now();
  
      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentY = startY + (targetY - startY) * eased;
        window.scrollTo(0, currentY);
  
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
  
      requestAnimationFrame(animate);
    };

  useEffect(() => {
    const handleMouseMove = () => {
      setShowOverlay(false);
      window.removeEventListener('mousemove', handleMouseMove);

      // Optional scroll to canvas
      const targetY = containerRef.current?.getBoundingClientRect().top + window.scrollY || 0;
      slowScrollTo(targetY, 1500); // 1.5s scroll duration
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Canvas */}
      <RunnerCanvas
        spriteImage={athleteSprite}
        backgroundImage={courtyardTile}
        idleRadius={80}
        rotateDeg={0}
        canvasStyle={{
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="text-white text-2xl font-semibold animate-pulse">
            Move your mouse!
          </div>
        </div>
      )}
    </div>
  );
}
