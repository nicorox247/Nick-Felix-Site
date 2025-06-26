// src/components/TimelineNode.jsx
export default function TimelineNode({ timelineData, activeIndex }) {
    return (
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const yOffset = index * 200;
          const xOffset = isLeft ? '-translate-x-[250px]' : 'translate-x-[50px]';
          const isActive = index === activeIndex;

          const lineStyle = {
            position: 'absolute',
            top: `${yOffset + 60}px`,
            left: isLeft ? 'calc(50% - 120px)' : 'calc(50% + 120px)',
            width: '2px',
            height: '140px',
            transform: isLeft ? 'rotate(-45deg)' : 'rotate(45deg)',
            transformOrigin: 'top center',
            backgroundColor: 'white',
          };

          return (
            <div key={index}>
              <div
                className={`absolute ${xOffset} w-64 p-4 rounded-lg bg-white shadow-md transition-all duration-700 ${isActive ? 'ring-4 ring-blue-400' : ''}`}
                style={{ top: `${yOffset}px` }}
              >
                <h3 className="font-bold text-lg text-black">{item.title || item.year}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              {index < timelineData.length - 1 && <div style={lineStyle}></div>}
            </div>
          );
        })}
      </div>
    );
  }
