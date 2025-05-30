import { useEffect, useState } from 'react';

export default function useMouseOverlayScroll(containerRef, scrollDuration = 1500) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowOverlay(false);
      window.removeEventListener('mousemove', handleMouseMove);

      if (containerRef?.current) {
        const targetY =
          containerRef.current.getBoundingClientRect().top + window.scrollY;

        const startY = window.scrollY;
        const startTime = performance.now();

        const animate = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / scrollDuration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const currentY = startY + (targetY - startY) * eased;
          window.scrollTo(0, currentY);

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef, scrollDuration]);

  return showOverlay;
}