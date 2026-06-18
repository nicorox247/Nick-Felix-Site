import { useRef, useState, useEffect } from 'react';

const RX = 12; // matches rounded-xl border-radius in px

function calcPerimeter(w, h) {
  return 2 * (w - 2 * RX) + 2 * (h - 2 * RX) + 2 * Math.PI * RX;
}

export default function ZoneObject({ zone, isActive, onClick }) {
  const pillRef = useRef(null);
  const [perimeter, setPerimeter] = useState(270);

  useEffect(() => {
    if (pillRef.current) {
      const { width, height } = pillRef.current.getBoundingClientRect();
      setPerimeter(calcPerimeter(width, height));
    }
  }, []);

  const tipLen  = 8;
  const nearLen = 25;
  const farLen  = 40;
  const nearOff = 17;
  const farOff  = 32;

  return (
    <div
      className="absolute z-10"
      style={{ top: zone.y, left: zone.x, transform: 'translate(-50%, -50%)', cursor: 'pointer' }}
      onClick={() => isActive && onClick(zone)}
    >
      <div className={isActive ? undefined : 'animate-bob'}>
        <div className="relative">

          {isActive && (
            <svg
              style={{
                position: 'absolute',
                top: '-2px', left: '-2px',
                width: 'calc(100% + 4px)', height: 'calc(100% + 4px)',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <style>{`
                @keyframes comet-tip  { from { stroke-dashoffset: 0; }        to { stroke-dashoffset: ${-perimeter}; } }
                @keyframes comet-near { from { stroke-dashoffset: ${nearOff}; } to { stroke-dashoffset: ${-(perimeter - nearOff)}; } }
                @keyframes comet-far  { from { stroke-dashoffset: ${farOff};  } to { stroke-dashoffset: ${-(perimeter - farOff)}; } }
              `}</style>
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="rgba(45,212,191,0.2)" strokeWidth="2"
                strokeDasharray={`${farLen} ${perimeter - farLen}`}
                style={{ animation: 'comet-far 1s linear infinite' }}
              />
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="rgba(45,212,191,0.6)" strokeWidth="2"
                strokeDasharray={`${nearLen} ${perimeter - nearLen}`}
                style={{ animation: 'comet-near 1s linear infinite' }}
              />
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="white" strokeWidth="2.5"
                strokeDasharray={`${tipLen} ${perimeter - tipLen}`}
                style={{ animation: 'comet-tip 1s linear infinite' }}
              />
            </svg>
          )}

          <div
            ref={pillRef}
            className={`relative z-10 rounded-xl px-4 py-2 text-center transition-all duration-300 ${
              isActive ? 'bg-white/65' : 'bg-black/65'
            }`}
          >
            <span className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              isActive ? 'text-black' : 'text-white'
            }`}>
              {zone.title}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
