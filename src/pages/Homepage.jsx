import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RunnerCanvas from '../components/RunnerCanvas';
import ZoneObject from '../components/ZoneObject';
import athleteSprite from '../assets/athlete-sprite.png';
import courtyardTile from '../assets/courtyard-tile.png';

const zones = [
  { id: 'research',  label: 'Research',  relativeX: 0.3484, relativeY: 0.4298, relativeRadius: 0.05 },
  { id: 'resume',    label: 'Resume',    relativeX: 0.4393, relativeY: 0.1100, relativeRadius: 0.05 },
  { id: 'projects',  label: 'Projects',  relativeX: 0.6545, relativeY: 0.1841, relativeRadius: 0.05 },
  { id: 'about',     label: 'About',     relativeX: 0.6646, relativeY: 0.8496, relativeRadius: 0.05 },
  { id: 'contact',   label: 'Contact',   relativeX: 0.6945, relativeY: 0.4327, relativeRadius: 0.05 },
];

export default function Homepage() {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const activeZoneRef = useRef(null);

  // Redirect handheld / small screens to About
  useEffect(() => {
    if (window.innerWidth < 768) {
      navigate('/about', { replace: true });
    }
  }, [navigate]);

  // Enter key navigates when inside a zone
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && activeZoneRef.current) {
        navigate(`/${activeZoneRef.current.id}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const handleZoneChange = useCallback((zone) => {
    setActiveZone(zone);
    activeZoneRef.current = zone;
  }, []);

  const absoluteZones = zones.map((zone) => ({
    ...zone,
    x: zone.relativeX * canvasSize.width,
    y: zone.relativeY * canvasSize.height,
    title: zone.label,
    preview: `Press Enter or click to visit`,
  }));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <RunnerCanvas
        spriteImage={athleteSprite}
        backgroundImage={courtyardTile}
        rotateDeg={0}
        zones={zones}
        onZoneChange={handleZoneChange}
        onCanvasResize={setCanvasSize}
      />

      {absoluteZones.map((zone) => (
        <ZoneObject
          key={zone.id}
          zone={zone}
          isActive={activeZone?.id === zone.id}
          onClick={() => navigate(`/${zone.id}`)}
        />
      ))}

      {/* Zone entry prompt */}
      {activeZone && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-black/70 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg pointer-events-none animate-pulse">
          Press Enter or click to visit {activeZone.label}
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 z-20 text-xs text-white/50 pointer-events-none select-none">
        Move your mouse to explore
      </div>
    </div>
  );
}
