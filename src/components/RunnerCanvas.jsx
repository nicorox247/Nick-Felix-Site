import { useRef, useEffect } from 'react';

export default function RunnerCanvas({
  spriteImage,
  backgroundImage,
  idleRadius = 80,
  scale = 1.5,
  runningFrames = [1, 2, 3, 4],
  gridCols = 2,
  maxEase = 0.01,
  minEase = 0.002,
  lockInDelay = 600,
  canvasStyle = {},
}) {
  const canvasRef = useRef(null);
  const sprite = useRef(new Image());
  const frame = useRef(1);

  const mousePos = useRef({ x: 100, y: 100 });
  const runnerPos = useRef({ x: 100, y: 100 });
  const isMoving = useRef(false);
  const lastDirection = useRef(1);
  const lastMouseDelta = useRef({ x: 0, y: 0 });
  const lastChangeTimestamp = useRef(Date.now());

  useEffect(() => {
    sprite.current.src = spriteImage;

    const updateMouse = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
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

      const background = new Image();
      background.src = backgroundImage;

      background.onload = () => {
        requestAnimationFrame(draw);
      };

      const draw = (timestamp) => {
        const dx = mousePos.current.x - runnerPos.current.x;
        const dy = mousePos.current.y - runnerPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const magnitude = distance || 1;
        const vx = dx / magnitude;
        const vy = dy / magnitude;

        const px = lastMouseDelta.current.x;
        const py = lastMouseDelta.current.y;

        const dot = vx * px + vy * py;
        const normalizedAgreement = (dot + 1) / 2;

        if (dot < 0.8) {
          lastChangeTimestamp.current = Date.now();
        }

        const timeSinceStable = Date.now() - lastChangeTimestamp.current;
        const adjustedAgreement =
          timeSinceStable >= lockInDelay ? normalizedAgreement : 0;

        const ease = minEase + (maxEase - minEase) * adjustedAgreement;

        lastMouseDelta.current = { x: vx, y: vy };

        runnerPos.current.x += dx * ease;
        runnerPos.current.y += dy * ease;

        isMoving.current = distance > idleRadius;

        if (dx !== 0) {
          lastDirection.current = dx > 0 ? 1 : -1;
        }

        if (timestamp - lastFrameTime > frameDuration) {
          if (isMoving.current) {
            currentRunningFrameIndex =
              (currentRunningFrameIndex + 1) % runningFrames.length;
            frame.current = runningFrames[currentRunningFrameIndex];
          } else {
            frame.current = 0;
          }
          lastFrameTime = timestamp;
        }

        const sx = (frame.current % gridCols) * frameWidth;
        const sy = Math.floor(frame.current / gridCols) * frameHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaledHeight = canvas.height;
        const bgScale = scaledHeight / background.width;
        const scaledWidth = background.height * bgScale;

        const drawWidth = frameWidth * scale;
        const drawHeight = frameHeight * scale;

        for (let x = 0; x < canvas.width; x += scaledWidth) {
          ctx.save();
          ctx.translate(x, 0);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(
            background,
            0, 0,
            background.width, background.height,
            0, -scaledHeight,
            background.width * bgScale,
            background.height * bgScale
          );
          ctx.restore();
        }

        ctx.save();
        if (lastDirection.current === -1) {
          ctx.scale(-1, 1);
          ctx.drawImage(
            sprite.current,
            sx, sy,
            frameWidth, frameHeight,
            -runnerPos.current.x - drawWidth / 2,
            runnerPos.current.y - drawHeight / 2,
            drawWidth, drawHeight
          );
        } else {
          ctx.drawImage(
            sprite.current,
            sx, sy,
            frameWidth, frameHeight,
            runnerPos.current.x - drawWidth / 2,
            runnerPos.current.y - drawHeight / 2,
            drawWidth, drawHeight
          );
        }
        ctx.restore();

        requestAnimationFrame(draw);
      };
    };

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [spriteImage, backgroundImage, idleRadius, scale, runningFrames, gridCols, maxEase, minEase, lockInDelay]);

  return <canvas ref={canvasRef} style={{ display: 'block', ...canvasStyle }} />;
}
