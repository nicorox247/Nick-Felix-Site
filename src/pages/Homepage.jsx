import { useEffect, useRef, useState } from 'react';
import mouseOverlay from '../hooks/mouseOverlay';
import RunnerCanvas from '../components/RunnerCanvas';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png';

export default function Homepage() {
  const containerRef = useRef(null);
  const showOverlay = mouseOverlay(containerRef, 1500); // <- hook with all the logic

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
