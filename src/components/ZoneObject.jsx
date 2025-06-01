import React from 'react';

export default function ZoneObject({ zone, isActive, onClick }) {
  return (
    <div
      className="absolute z-10 transition-all duration-300"
      style={{
        top: zone.y,
        left: zone.x,
        transform: 'translate(-50%, -50%)',
        cursor: isActive ? 'pointer' : 'default',
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? '1.15' : '1',
      }}
      onClick={() => isActive && onClick(zone)}
    >
      {/* Title Bubble */}
      <div className="bg-white text-black text-xs px-2 py-1 rounded shadow text-center mb-1">
        {zone.title}
      </div>

      {/* Preview (visible when active) */}
      {isActive && (
        <div className="bg-white text-black text-xs px-3 py-2 rounded shadow w-40 text-center">
          {zone.preview}
        </div>
      )}
    </div>
  );
}
