// /components/DevZoneEditor.jsx
import { useState, useEffect } from 'react';

export default function DevZoneEditor({ zones, canvasSize, onZoneUpdate }) {
  const [draggingId, setDraggingId] = useState(null);

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    setDraggingId(id);
  };

  const handleMouseMove = (e) => {
    if (draggingId === null) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const relativeX = x / canvasSize.width;
    const relativeY = y / canvasSize.height;

    onZoneUpdate(draggingId, { relativeX, relativeY });
  };

  const handleMouseUp = () => {
    setDraggingId(null);
      // Optional: Copy to clipboard
      navigator.clipboard.writeText(JSON.stringify(zones, null, 2)).then(() => {
        console.log('Copied updated zone config to clipboard!');
      });
  };

  useEffect(() => {
    if (draggingId !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingId]);

  return zones.map((zone) => {
    const x = zone.relativeX * canvasSize.width;
    const y = zone.relativeY * canvasSize.height;
    const radius = zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height);

    return (
      <div
        key={zone.id}
        className="absolute z-50 border-2 border-blue-500 rounded-full bg-blue-100 opacity-70 cursor-move"
        onMouseDown={(e) => handleMouseDown(e, zone.id)}
        style={{
          top: y,
          left: x,
          width: radius * 2,
          height: radius * 2,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-blue-800 font-semibold bg-white rounded px-1">
          {zone.label}
        </div>
      </div>
    );
  });
}

