import { useRef, useEffect } from 'react';
import athleteSprite from '../assets/athlete-sprite.png';

const SPEED = 10;
const SCALE = 2;
const GRID_COLS = 2;
const RUNNING_FRAMES = [1, 2, 3, 4];
const FPS = 8;

export default function TransitionRunner({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sprite = new Image();
    sprite.src = athleteSprite;

    let animId;
    let lastFrameTime = 0;
    let frameIndex = 0;
    let x = -80;
    const y = canvas.height / 2;

    const draw = (timestamp) => {
      const frameWidth = sprite.width / GRID_COLS;
      const frameHeight = sprite.height / 3;
      const drawWidth = frameWidth * SCALE;
      const drawHeight = frameHeight * SCALE;

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastFrameTime > 1000 / FPS) {
        frameIndex = (frameIndex + 1) % RUNNING_FRAMES.length;
        lastFrameTime = timestamp;
      }

      const frame = RUNNING_FRAMES[frameIndex];
      const sx = (frame % GRID_COLS) * frameWidth;
      const sy = Math.floor(frame / GRID_COLS) * frameHeight;

      ctx.drawImage(
        sprite, sx, sy, frameWidth, frameHeight,
        x - drawWidth / 2, y - drawHeight / 2, drawWidth, drawHeight
      );

      x += SPEED;

      if (x > canvas.width + drawWidth) {
        onComplete();
        return;
      }

      animId = requestAnimationFrame(draw);
    };

    if (sprite.complete) {
      animId = requestAnimationFrame(draw);
    } else {
      sprite.onload = () => { animId = requestAnimationFrame(draw); };
    }

    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  );
}
