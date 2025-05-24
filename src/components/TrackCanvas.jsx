import { useRef, useEffect } from 'react';
import athleteSprite from '../assets/athlete-sprite.png';
import trackTile from '../assets/track-tile.png';


export default function TrackCanvas() {
  const canvasRef = useRef(null);
  const sprite = useRef(new Image());
  const frame = useRef(1);

  const mousePos = useRef({ x: 100, y: 100 });
  const runnerPos = useRef({ x: 100, y: 100 });
  const isMoving = useRef(false);
  const lastDirection = useRef(1);
  const lastMouseDelta = useRef({ x: 0, y: 0 });
  const lastChangeTimestamp = useRef(Date.now());

  const runningFrameIndices = [1, 2, 3, 4];
  const gridCols = 2;
  const scale = 1.5;

  useEffect(() => {
    sprite.current.src = athleteSprite;

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
    //   ctx.imageSmoothingEnabled = false;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const frameWidth = sprite.current.width / gridCols;
      const frameHeight = sprite.current.height / 3;

      let lastFrameTime = 0;
      const fps = 8;
      const frameDuration = 1000 / fps;
      let currentRunningFrameIndex = 0;

      const background = new Image();
      background.src = trackTile;

      background.onload = () => {
        requestAnimationFrame(draw); // ✅ START animation only when track is ready
      };


      const draw = (timestamp) => {
        const dx = mousePos.current.x - runnerPos.current.x;
        const dy = mousePos.current.y - runnerPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize current direction
        const magnitude = distance || 1;
        const vx = dx / magnitude;
        const vy = dy / magnitude;

        // Previous direction
        const px = lastMouseDelta.current.x;
        const py = lastMouseDelta.current.y;

        // Dot product → directional agreement
        const dot = vx * px + vy * py;
        const normalizedAgreement = (dot + 1) / 2;

        // If the direction has changed too much, reset lock-in delay
        const angleThreshold = 0.8;
        if (dot < angleThreshold) {
          lastChangeTimestamp.current = Date.now();
        }

        // Ease based on delay + directional consistency
        const timeSinceStable = Date.now() - lastChangeTimestamp.current;
        const lockInDelay = 600;

        const maxEase = 0.01;
        const minEase = 0.002;

        const adjustedAgreement =
          timeSinceStable >= lockInDelay ? normalizedAgreement : 0;

        const ease = minEase + (maxEase - minEase) * adjustedAgreement;

        lastMouseDelta.current = { x: vx, y: vy };

        // Move runner
        runnerPos.current.x += dx * ease;
        runnerPos.current.y += dy * ease;

        // Movement detection
        const idleRadius = 80;
        isMoving.current = distance > idleRadius;


        // Update direction for flipping
        if (dx !== 0) {
          lastDirection.current = dx > 0 ? 1 : -1;
        }

        // Update animation frame
        if (timestamp - lastFrameTime > frameDuration) {
          if (isMoving.current) {
            currentRunningFrameIndex =
              (currentRunningFrameIndex + 1) % runningFrameIndices.length;
            frame.current = runningFrameIndices[currentRunningFrameIndex];
          } else {
            frame.current = 0; // idle
          }
          lastFrameTime = timestamp;
        }

        const sx = (frame.current % gridCols) * frameWidth;
        const sy = Math.floor(frame.current / gridCols) * frameHeight;

        
        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scale to match canvas height (after rotation)
        const scaledHeight = canvas.height;
        const bgScale = scaledHeight / background.width; // because width becomes height after rotation
        const scaledWidth = background.height * bgScale; // keep aspect ratio

        const drawWidth = frameWidth * scale;
        const drawHeight = frameHeight * scale;
        
        // Tile horizontally across the canvas
        for (let x = 0; x < canvas.width; x += scaledWidth) {
        ctx.save();

        // Translate to top-left corner of where the tile should appear
        ctx.translate(x, 0);

        // Rotate 90 degrees clockwise
        ctx.rotate(Math.PI / 2);

        // Draw with scaling applied
        ctx.drawImage(
            background,
            0, 0,
            background.width, background.height,
            0, -scaledHeight, // draw upward after rotation
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

    //   requestAnimationFrame(draw);
    };

    return () => {
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}
