import { useEffect, useRef, useState } from 'react';
import mouseOverlay from '../hooks/mouseOverlay';
import RunnerCanvas from '../components/RunnerCanvasOld';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png';
import useInteractiveZones from '../hooks/useInteractiveZone';
import ZoneObject from '../components/ZoneObject';
import DevZoneEditor from '../components/DevZoneEditor';




const baseZones = [
  {
    "id": "research",
    "label": "Research Booth",
    "relativeX": 0.3483636363636364,
    "relativeY": 0.4297669876453488,
    "relativeRadius": 0.05
  },
  {
    "id": "resume",
    "label": "Resume Scroll",
    "relativeX": 0.43927272727272726,
    "relativeY": 0.10999954578488372,
    "relativeRadius": 0.05
  },
  {
    "id": "project_1",
    "label": "Featured Poject 1",
    "relativeX": 0.6545454545454545,
    "relativeY": 0.1841274527616279,
    "relativeRadius": 0.05
  },
  {
    "id": "project_2",
    "label": "Featured Project 2",
    "relativeX": 0.6645833333333333,
    "relativeY": 0.8495551215277778,
    "relativeRadius": 0.05
  },
  {
    "id": "other",
    "label": "All Projects",
    "relativeX": 0.6945454545454546,
    "relativeY": 0.43267396438953487,
    "relativeRadius": 0.05
  }
];



export default function Homepage() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const showOverlay = mouseOverlay(containerRef, 1500); // <- hook with all the logic

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [playerPos, setPlayerPos] = useState(null);

  const activeZone = useInteractiveZones(playerPos, canvasSize, baseZones);

  // THIS IS THE HELPER LOGIC DELETE WHEN DONE!!!
  const [editableZones, setEditableZones] = useState(baseZones);
  const [showZoneHelpers, setShowZoneHelpers] = useState(false);


  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };
  
    updateCanvasSize(); // call once initially
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const absoluteZones = baseZones.map((zone) => ({
    ...zone,
    x: zone.relativeX * canvasSize.width,
    y: zone.relativeY * canvasSize.height,
    radius: zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height),
    title: zone.label,
    preview: `View my ${zone.id}`, // optional
  }));


  // THIS IS THE DEV HELPER PLEASE DELETE WHEN DONE!!
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'h') {
        setShowZoneHelpers((prev) => !prev);
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // THIS IS THE DEV HELPER PLEASE DELETE WHEN DONE!!
  const updateZonePosition = (id, newRelCoords) => {
    setEditableZones((prev) =>
      prev.map((zone) =>
        zone.id === id ? { ...zone, ...newRelCoords } : zone
      )
    );
    console.log(`Updated ${id}:`, newRelCoords);
  };
  
  
  

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">

      {/* Canvas */}
      <RunnerCanvas
        canvasRef={canvasRef}
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

      {absoluteZones.map((zone) => (
        <ZoneObject
          key={zone.id}
          zone={zone}
          isActive={activeZone?.id === zone.id}
          onClick={() => window.location.href = `/${zone.id}`} // or use Next.js router
        />
      ))}

      

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

      {/* THIS IS THE HELPER DELETE WHEN DONE */}

      {showZoneHelpers && (
        <DevZoneEditor
          zones={editableZones}
          canvasSize={canvasSize}
          onZoneUpdate={updateZonePosition}
        />
      )}


      



    </div>
  );
}
