import { useEffect, useRef, useState } from 'react';
import mouseOverlay from '../hooks/mouseOverlay';
import RunnerCanvas from '../components/RunnerCanvas';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png';
import useInteractiveZones from '../hooks/useInteractiveZone';


const baseZones = [
  {
    id: 'research',
    label: 'Research Booth',
    relativeX: 0.25,
    relativeY: 0.5,
    relativeRadius: 0.05,
  },
  {
    id: 'resume',
    label: 'Resume Scroll',
    relativeX: 0.75,
    relativeY: 0.5,
    relativeRadius: 0.05,
  },
];

export default function Homepage() {
  const containerRef = useRef(null);
  const showOverlay = mouseOverlay(containerRef, 1500); // <- hook with all the logic

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [playerPos, setPlayerPos] = useState(null);

  const activeZone = useInteractiveZones(playerPos, canvasSize, baseZones);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">

      {/* Canvas */}
      <RunnerCanvas
        spriteImage={athleteSprite}
        backgroundImage={courtyardTile}
        idleRadius={15}
        rotateDeg={0}

        canvasStyle={{
          position: 'relative',
          top: 0,
          left: 0,
          zIndex: 0,
        }}

        onPlayerMove={setPlayerPos}
        onCanvasResize={setCanvasSize}
      />
      

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="text-white text-2xl font-semibold animate-pulse">
            Move your mouse!
          </div>
        </div>
      )}

      {/* Optional: UI preview when athlete enters a zone */}
      {activeZone && (
        <div className="absolute z-40 left-1/2 bottom-10 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <h3 className="font-bold">{activeZone.label}</h3>
          <p className="text-sm text-gray-600">Click to view {activeZone.id}</p>
        </div>
      )}


    </div>
  );
}
