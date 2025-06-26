import { useEffect, useRef, useState } from 'react';
import athleteSprite from '../assets/athlete-sprite.png';

export default function AthleteSprite({ activeIndex, isRunning, facingLeft }) {
  const translateRef = useRef(null);
  const [frame, setFrame] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const cols = 2;
  const rows = 3;

  useEffect(() => {
    const img = new Image();
    img.src = athleteSprite;
    img.onload = () => {
      setFrameWidth(img.naturalWidth / cols);
      setFrameHeight(img.naturalHeight / rows);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setFrame((prev) => ((prev - 1 + 1) % 4) + 1); // cycle frames 1-4
      }, 100); // 10 FPS
    } else {
      setFrame(0); // idle frame
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const nodeSpacingY = 200;
    const offsetY = activeIndex * nodeSpacingY;
    const offsetX = activeIndex % 2 === 0 ? -80 : 80;

    if (translateRef.current) {
      translateRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  }, [activeIndex]);

  const col = frame % cols;
  const row = Math.floor(frame / cols);

  return (
    <div
      ref={translateRef}
      className="absolute top-0 left-1/2 transition-transform duration-700 ease-in-out"
    >
      <div
        style={{
          transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: `${frameWidth}px`,
            height: `${frameHeight}px`,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${athleteSprite})`,
              backgroundPosition: `-${col * frameWidth}px -${row * frameHeight}px`,
              backgroundRepeat: 'no-repeat',
              width: `${frameWidth * cols}px`,
              height: `${frameHeight * rows}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
