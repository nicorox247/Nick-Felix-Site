// /hooks/useInteractiveZones.js
import { useMemo } from 'react';

export default function useInteractiveZones(playerPos, canvasSize, baseZones) {
  return useMemo(() => {
    if (!canvasSize.width || !canvasSize.height || !playerPos) return null;

    for (const zone of baseZones) {
      const zoneX = zone.relativeX * canvasSize.width;
      const zoneY = zone.relativeY * canvasSize.height;
      const radius = zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height);

      const dx = playerPos.x - zoneX;
      const dy = playerPos.y - zoneY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) return zone;
    }

    return null;
  }, [playerPos, canvasSize, baseZones]);
}
