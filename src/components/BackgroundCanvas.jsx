import { useRef, useEffect } from 'react';

export default function BackgroundCanvas({ backgroundImage, rotateDeg = 0, onResize }) {
  const canvasRef = useRef(null);
  const background = useRef(new Image());

  const drawBackground = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const scaleX = canvas.width / background.current.width;
    const scaleY = canvas.height / background.current.height;
    const bgScale = Math.min(scaleX, scaleY);

    const centerX = (canvas.width - background.current.width * bgScale) / 2;
    const centerY = (canvas.height - background.current.height * bgScale) / 2;

    const angle = (rotateDeg * Math.PI) / 180;

    ctx.save();
    ctx.translate(
      centerX + (background.current.width * bgScale) / 2,
      centerY + (background.current.height * bgScale) / 2
    );
    ctx.rotate(angle);
    ctx.drawImage(
      background.current,
      0,
      0,
      background.current.width,
      background.current.height,
      -(background.current.width * bgScale) / 2,
      -(background.current.height * bgScale) / 2,
      background.current.width * bgScale,
      background.current.height * bgScale
    );
    ctx.restore();
  };

  useEffect(() => {
    const resize = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawBackground();
      if (onResize) onResize({ width: canvasRef.current.width, height: canvasRef.current.height });
    };

    window.addEventListener('resize', resize);
    resize();

    return () => window.removeEventListener('resize', resize);
  }, [onResize]);

  useEffect(() => {
    background.current.src = backgroundImage;
    background.current.onload = drawBackground;
  }, [backgroundImage]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
