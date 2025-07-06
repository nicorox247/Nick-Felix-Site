// src/components/TimelineNode.jsx
import { useRef } from 'react';

export default function TimelineNode({ timelineData, activeIndex, nodeRefs }) {
    return (
      <div className="relative flex flex-col pb-10 items-center">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const yOffset = index * 240;
          const xOffset = isLeft ? '-translate-x-[170px]' : 'translate-x-[170px]';
          const isActive = index === activeIndex;

          const containerMid = window.innerWidth / 2;
            const nodeOffset = 220;
            const leftOffset = isLeft ? `-translate-x-[${nodeOffset}px]` : `translate-x-[${nodeOffset}px]`;


          const lineStyle = {
            width: '2px',
            height: '100px',
            backgroundColor: 'white',
            transform: isLeft ? 'rotate(-45deg)' : 'rotate(45deg)',
            transformOrigin: 'top center',
            marginTop: '1.5rem',
            marginBottom: '1.5rem',
            position: 'relative',
            top: `${yOffset + 60}px`,
          };
          

          return (
            <div key={index}>
                <div
                    ref={(el) => (nodeRefs.current[index] = el)} // ← Save ref
                    className={`relative ${xOffset} w-150 p-20 rounded-lg bg-gradient-to-bl from-primary to-red-700 shadow-md transition-all duration-700 ${isActive ? 'bg-blue-200 ring-4 ring-blue-400' : ''}`}
                    >
                    <h3 className="font-bold text-xl text-light">{item.title || item.year}</h3>
                    <p className="text-lg text-light">{item.description}</p>
                </div>
              {index < timelineData.length - 1 && (
                  <div className="h-20 flex justify-center items-center">
                  <div
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: 'white',
                      transform: isLeft ? 'rotate(-45deg)' : 'rotate(45deg)',
                      transformOrigin: 'top center',
                    }}
                  />
                </div>
              )}

            </div>
          );
        })}
      </div>
    );
  }
