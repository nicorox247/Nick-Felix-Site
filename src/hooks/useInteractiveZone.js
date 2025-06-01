import { useState, useEffect } from 'react';

export default function useInteractiveZones(baseZones, canvasSize) {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    if (!canvasSize.width || !canvasSize.height) return;

    // Assume base zones are defined in relative terms (e.g., 0.1 to 1.0)
    const scaledZones = baseZones.map(zone => ({
      ...zone,
      x: zone.relativeX * canvasSize.width,
      y: zone.relativeY * canvasSize.height,
      radius: zone.relativeRadius * Math.min(canvasSize.width, canvasSize.height),
    }));

    setZones(scaledZones);
  }, [baseZones, canvasSize]);

  return zones;
}
