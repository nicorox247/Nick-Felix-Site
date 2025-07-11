import { useEffect, useRef, useState } from 'react';
import athleteSprite from '../assets/athlete-sprite.png';

export default function AthleteSprite({ activeIndex, isRunning, facingLeft, nodeRefs }) {
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
      }, 80); // 8 FPS
    } else {
      setFrame(0); // idle frame
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const node = nodeRefs.current[activeIndex];
    if (node && translateRef.current) {
      const containerRect = document.getElementById('timeline-container').getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      
      const nodeIndex = activeIndex;
      const isLeft = nodeIndex % 2 === 0;

      const localX = isLeft
        ? nodeRect.left - containerRect.left - frameWidth/3 // top-left corner of node
        : nodeRect.right - containerRect.left - frameWidth/2; // top-right corner minus sprite width
      const localY = nodeRect.top - containerRect.top - frameHeight/1.5;
      
      translateRef.current.style.transform = `translate(${localX}px, ${localY}px)`;
      
    }
  }, [activeIndex, frameWidth, frameHeight]);

  // console.log({
  //   // rect: node.getBoundingClientRect(),
  //   scrollX: window.scrollX,
  //   scrollY: window.scrollY,
  //   frameWidth,
  //   frameHeight,
  // });
  

  const col = frame % cols;
  const row = Math.floor(frame / cols);

  return (
    <div
      ref={translateRef}
      className="absolute z-2 top-0 transition-transform duration-700 ease-in-out"
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
