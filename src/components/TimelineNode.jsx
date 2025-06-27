// src/components/TimelineNode.jsx
import { useRef } from 'react';

export default function TimelineNode({ timelineData, activeIndex, nodeRefs }) {
    return (
      <div className="relative flex flex-col pb-10 items-center">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const yOffset = index * 200;
          const xOffset = isLeft ? '-translate-x-[170px]' : 'translate-x-[170px]';
          const isActive = index === activeIndex;

          const containerMid = window.innerWidth / 2;
            const nodeOffset = 170;
            const leftOffset = isLeft ? containerMid - nodeOffset : containerMid + nodeOffset;


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
                    className={`relative ${xOffset} w-64 p-4 rounded-lg bg-white shadow-md transition-all duration-700 ${isActive ? 'ring-4 ring-blue-400' : ''}`}
                    >
                    <h3 className="font-bold text-lg text-black">{item.title || item.year}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
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
