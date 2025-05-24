import { useRef, useEffect } from 'react';
import athleteSprite from '../assets/athlete-sprite.png';

export default function TrackCanvas() {
  const canvasRef = useRef(null);
  const sprite = useRef(new Image());
  const frame = useRef(1);
  const mousePos = useRef({ x: 100, y: 100 });
  const prevMousePos = useRef({ x: 100, y: 100 });
  const isMoving = useRef(false);
  const lastDirection = useRef(1); // 1 = right, -1 = left

  // These are the grid indices of the running frames in the 2x3 sprite sheet
  const runningFrameIndices = [1, 2, 3, 4]; // frame 0 = idle
  const gridCols = 2;
  const scale = 2;

  useEffect(() => {
    sprite.current.src = athleteSprite;

    const updateMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', updateMouse);

    sprite.current.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const frameWidth = sprite.current.width / gridCols;
      const frameHeight = sprite.current.height / 3;

      let lastFrameTime = 0;
      const fps = 8;
      const frameDuration = 1000 / fps;
      let currentRunningFrameIndex = 0;

      const draw = (timestamp) => {
        // Detect movement
        const dx = mousePos.current.x - prevMousePos.current.x;
        const dy = mousePos.current.y - prevMousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        isMoving.current = distance > 1;
        prevMousePos.current = { ...mousePos.current };

        // Update direction
        if (dx !== 0) {
          lastDirection.current = dx > 0 ? 1 : -1;
        }

        if (timestamp - lastFrameTime > frameDuration) {
          if (isMoving.current) {
            currentRunningFrameIndex =
              (currentRunningFrameIndex + 1) % runningFrameIndices.length;
            frame.current = runningFrameIndices[currentRunningFrameIndex];
          } else {
            frame.current = 0; // idle frame
          }
          lastFrameTime = timestamp;
        }

        const sx = (frame.current % gridCols) * frameWidth;
        const sy = Math.floor(frame.current / gridCols) * frameHeight;

        const drawWidth = frameWidth * scale;
        const drawHeight = frameHeight * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#d23f3f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();

        if (lastDirection.current === -1) {
          ctx.scale(-1, 1);
          ctx.drawImage(
            sprite.current,
            sx, sy,
            frameWidth, frameHeight,
            -mousePos.current.x - drawWidth / 2,
            mousePos.current.y - drawHeight / 2,
            drawWidth, drawHeight
          );
        } else {
          ctx.drawImage(
            sprite.current,
            sx, sy,
            frameWidth, frameHeight,
            mousePos.current.x - drawWidth / 2,
            mousePos.current.y - drawHeight / 2,
            drawWidth, drawHeight
          );
        }

        ctx.restore();

        requestAnimationFrame(draw);
      };

      requestAnimationFrame(draw);
    };

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}
