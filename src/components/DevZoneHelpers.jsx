import React from 'react';

export default function DevZoneHelpers({ zones, canvasSize }) {
  if (!canvasSize.width || !canvasSize.height) return null;

  return zones.map((zone) => (
    <div
      key={zone.id}
      style={{
        position: 'absolute',
        top: `${zone.relativeY * canvasSize.height}px`,
        left: `${zone.relativeX * canvasSize.width}px`,
        width: `${zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height) * 2}px`,
        height: `${zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height) * 2}px`,
        borderRadius: '50%',
        border: '1px dashed red',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  ));
}
