// src/components/TrackCanvas.jsx
import { useEffect, useRef } from 'react';
import athleteSprite from '../assets/athlete.png'; // your sprite

export default function TrackCanvas() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const sprite = useRef(new Image());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    sprite.current.src = athleteSprite;

    const updateMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', updateMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw track (background color for now)
      ctx.fillStyle = '#d23f3f'; // red track
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw athlete (replace with animated sprite logic)
      ctx.drawImage(sprite.current, mousePos.current.x - 32, mousePos.current.y - 32, 64, 64);

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}
