import { useRef, useEffect } from 'react';

const DEFAULT_RUNNING_FRAMES = [1, 2, 3, 4];
const DEFAULT_ZONES = [];

export default function SpriteCanvas({
  spriteImage,
  zones = DEFAULT_ZONES,
  idleRadius = 30,
  scale = 1.7,
  runningFrames = DEFAULT_RUNNING_FRAMES,
  gridCols = 2,
  maxEase = 0.01,
  minEase = 0.001,
  lockInDelay = 600,
  departureDelay = 300,
  onZoneChange,
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
  const atRest = useRef(false);
  const departureTimer = useRef(null);

  // Keep zones and callback in refs so the RAF loop never needs to restart
  const zonesRef = useRef(zones);
  const onZoneChangeRef = useRef(onZoneChange);
  const activeZoneIdRef = useRef(null);

  useEffect(() => { zonesRef.current = zones; }, [zones]);
  useEffect(() => { onZoneChangeRef.current = onZoneChange; }, [onZoneChange]);

  useEffect(() => {
    sprite.current.src = spriteImage;

    const updateMouse = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', updateMouse);

    let animationId = null;
    let lastFrameTime = 0;
    const fps = 8;
    const frameDuration = 1000 / fps;
    let currentRunningFrameIndex = 0;

    const draw = (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      const dx = mousePos.current.x - runnerPos.current.x;
      const dy = mousePos.current.y - runnerPos.current.y;
      const distance = Math.hypot(dx, dy);
      const magnitude = distance || 1;
      const vx = dx / magnitude;
      const vy = dy / magnitude;

      // Departure delay — hold position after arriving until mouse gets far enough away
      if (distance <= idleRadius) {
        atRest.current = true;
        departureTimer.current = null;
      } else if (atRest.current) {
        if (departureTimer.current === null) departureTimer.current = Date.now();
        if (Date.now() - departureTimer.current < departureDelay) {
          isMoving.current = false;
          animationId = requestAnimationFrame(draw);
          return;
        }
        atRest.current = false;
        departureTimer.current = null;
        lastChangeTimestamp.current = Date.now(); // reset lockIn so it ramps up fresh
      }

      const dot = vx * lastMouseDelta.current.x + vy * lastMouseDelta.current.y;
      if (dot < 0.8) lastChangeTimestamp.current = Date.now();

      const timeSinceStable = Date.now() - lastChangeTimestamp.current;
      const adjustedAgreement = timeSinceStable >= lockInDelay ? (dot + 1) / 2 : 0;
      const ease = minEase + (maxEase - minEase) * adjustedAgreement;

      lastMouseDelta.current = { x: vx, y: vy };
      runnerPos.current.x += dx * ease;
      runnerPos.current.y += dy * ease;

      isMoving.current = distance > idleRadius;
      if (dx !== 0) lastDirection.current = dx > 0 ? 1 : -1;

      // Zone detection in RAF — only fires callback on enter/exit
      const cw = canvas.width;
      const ch = canvas.height;
      let newZone = null;
      for (const zone of zonesRef.current) {
        const zx = zone.relativeX * cw;
        const zy = zone.relativeY * ch;
        const r = zone.relativeRadius * Math.min(cw, ch);
        if (Math.hypot(runnerPos.current.x - zx, runnerPos.current.y - zy) < r) {
          newZone = zone;
          break;
        }
      }
      const newId = newZone?.id ?? null;
      if (newId !== activeZoneIdRef.current) {
        activeZoneIdRef.current = newId;
        onZoneChangeRef.current?.(newZone);
      }

      // Frame cycling
      if (timestamp - lastFrameTime > frameDuration) {
        if (isMoving.current) {
          currentRunningFrameIndex = (currentRunningFrameIndex + 1) % runningFrames.length;
          frame.current = runningFrames[currentRunningFrameIndex];
        } else {
          frame.current = 0;
        }
        lastFrameTime = timestamp;
      }

      // Draw
      const frameWidth = sprite.current.width / gridCols;
      const frameHeight = sprite.current.height / 3;
      const drawWidth = frameWidth * scale;
      const drawHeight = frameHeight * scale;
      const sx = (frame.current % gridCols) * frameWidth;
      const sy = Math.floor(frame.current / gridCols) * frameHeight;

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
          sprite.current, sx, sy, frameWidth, frameHeight,
          -runnerPos.current.x - drawWidth / 2, runnerPos.current.y - drawHeight / 2,
          drawWidth, drawHeight
        );
      } else {
        ctx.drawImage(
          sprite.current, sx, sy, frameWidth, frameHeight,
          runnerPos.current.x - drawWidth / 2, runnerPos.current.y - drawHeight / 2,
          drawWidth, drawHeight
        );
      }
      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (sprite.current.complete) {
      animationId = requestAnimationFrame(draw);
    } else {
      sprite.current.onload = () => { animationId = requestAnimationFrame(draw); };
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [spriteImage, idleRadius, scale, runningFrames, gridCols, maxEase, minEase, lockInDelay, departureDelay]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
