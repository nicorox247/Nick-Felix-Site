export default function ZoneObject({ zone, isActive, onClick }) {
  return (
    <div
      className="absolute z-10"
      style={{
        top: zone.y,
        left: zone.x,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
      }}
      onClick={() => isActive && onClick(zone)}
    >
      {/* Bob wrapper — only animates when inactive */}
      <div className={isActive ? undefined : 'animate-bob'}>
        <div className="relative">

          {/* SVG comet — traces the actual rectangle border */}
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
                @keyframes comet-tip  { from { stroke-dashoffset: 0;  } to { stroke-dashoffset: -1008; } }
                @keyframes comet-near { from { stroke-dashoffset: 17; } to { stroke-dashoffset: -991;  } }
                @keyframes comet-far  { from { stroke-dashoffset: 32; } to { stroke-dashoffset: -976;  } }
              `}</style>
              {/* Far tail — faint teal */}
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="rgba(45,212,191,0.2)" strokeWidth="2" strokeDasharray="40 1000"
                style={{ animation: 'comet-far 3s linear infinite' }}
              />
              {/* Near tail — brighter teal */}
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="rgba(45,212,191,0.6)" strokeWidth="2" strokeDasharray="25 1000"
                style={{ animation: 'comet-near 3s linear infinite' }}
              />
              {/* Tip — white, leads */}
              <rect x="0" y="0" width="100%" height="100%" rx="12" fill="none"
                stroke="white" strokeWidth="2.5" strokeDasharray="8 1000"
                style={{ animation: 'comet-tip 3s linear infinite' }}
              />
            </svg>
          )}

          {/* Pill content */}
          <div
            className={`relative z-10 rounded-xl px-4 py-2 text-center transition-all duration-300 ${
              isActive ? 'bg-black/40' : 'bg-black/65'
            }`}
          >
            <span
              className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                isActive ? 'text-white/60' : 'text-white'
              }`}
            >
              {zone.title}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
