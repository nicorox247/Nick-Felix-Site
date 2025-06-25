// src/components/TimelineNode.jsx
export default function TimelineNode({ year, text, isLeft, isActive, index }) {
    const offsetX = isLeft ? '-translate-x-40' : 'translate-x-40';
    const offsetY = index * 200; // vertical spacing per node
    const lineRotation = isLeft ? 'rotate-45' : '-rotate-45';
  
    return (
      <div
        className={`absolute left-1/2 transform ${offsetX} translate-y-[${offsetY}px] flex flex-col items-center`}
      >
        {/* Diagonal connector line */}
        {index > 0 && (
          <div
            className={`w-32 h-1 bg-white transform origin-top ${lineRotation} mb-4`}
          ></div>
        )}
  
        {/* Node bubble */}
        <div
          className={`p-4 rounded-lg shadow-lg w-48 text-center ${isActive ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          <h3 className="text-xl font-bold">{year}</h3>
          <p className="text-sm mt-2">{text}</p>
        </div>
      </div>
    );
  }
  