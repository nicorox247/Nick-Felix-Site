import { useRef, useEffect } from 'react';

export default function SpriteCanvas({
  spriteImage,
  idleRadius = 35,
  scale = 1.7,
  rotateDeg = 0,
  runningFrames = [1, 2, 3, 4],
  gridCols = 2,
  maxEase = 0.0002,
  minEase = 0.00005,
  lockInDelay = 600,
  onPlayerMove,
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

    let animationId = null;
    let lastFrameTime = Date.now();
    const fps = 8;
    const frameDuration = 1000 / fps;
    let currentRunningFrameIndex = 0;

    const draw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const now = Date.now();

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

      if (dot < 0.8) lastChangeTimestamp.current = now;

      const timeSinceStable = now - lastChangeTimestamp.current;
      const adjustedAgreement = timeSinceStable >= lockInDelay ? normalizedAgreement : 0;

      const ease = minEase + (maxEase - minEase) * adjustedAgreement;
      lastMouseDelta.current = { x: vx, y: vy };

      runnerPos.current.x += dx * ease;
      runnerPos.current.y += dy * ease;

      isMoving.current = distance > idleRadius;

      if (dx !== 0) lastDirection.current = dx > 0 ? 1 : -1;

      if (isMoving.current && now - lastFrameTime > frameDuration) {
        currentRunningFrameIndex =
          (currentRunningFrameIndex + 1) % runningFrames.length;
        frame.current = runningFrames[currentRunningFrameIndex];
        lastFrameTime = now;
      } else if (!isMoving.current) {
        frame.current = 0;
      }

      if (onPlayerMove) {
        onPlayerMove({ x: runnerPos.current.x, y: runnerPos.current.y });
      }

      const frameWidth = sprite.current.width / gridCols;
      const frameHeight = sprite.current.height / 3;
      const drawWidth = frameWidth * scale;
      const drawHeight = frameHeight * scale;

      const sx = (frame.current % gridCols) * frameWidth;
      const sy = Math.floor(frame.current / gridCols) * frameHeight;

      // Only clear the area where the sprite was previously drawn
      ctx.clearRect(
        runnerPos.current.x - drawWidth,
        runnerPos.current.y - drawHeight,
        drawWidth * 2,
        drawHeight * 2
      );

      ctx.save();
      if (lastDirection.current === -1) {
        ctx.scale(-1, 1);
        ctx.drawImage(
          sprite.current,
          sx,
          sy,
          frameWidth,
          frameHeight,
          -runnerPos.current.x - drawWidth / 2,
          runnerPos.current.y - drawHeight / 2,
          drawWidth,
          drawHeight
        );
      } else {
        ctx.drawImage(
          sprite.current,
          sx,
          sy,
          frameWidth,
          frameHeight,
          runnerPos.current.x - drawWidth / 2,
          runnerPos.current.y - drawHeight / 2,
          drawWidth,
          drawHeight
        );
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    const startIfReady = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any previous transform
      ctx.scale(dpr, dpr);

      if (sprite.current.complete) {
        animationId = requestAnimationFrame(draw);
      } else {
        sprite.current.onload = () => {
          animationId = requestAnimationFrame(draw);
        };
      }
    };

    startIfReady();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [
    spriteImage,
    idleRadius,
    scale,
    runningFrames,
    gridCols,
    maxEase,
    minEase,
    lockInDelay,
    onPlayerMove,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // ensures mouse events pass through
      }}
    />
  );
}
