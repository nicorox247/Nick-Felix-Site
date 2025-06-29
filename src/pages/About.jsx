// src/pages/About.jsx
import { useState, useRef, useEffect } from 'react';
import AthleteSprite from '../components/AthleteSprite';
import TimelineNode from '../components/TimelineNode';

const timelineData = [
  {
    year: '2020',
    description: 'Started college and began exploring software development.',
  },
  {
    year: '2021',
    description: 'Built my first full-stack application and interned at ClaimTek.',
  },
  {
    year: '2022',
    description: 'Expanded into blockchain and fintech projects.',
  },
  {
    year: '2023',
    description: 'Created educational tools and focused on UI/UX design.',
  },
  {
    year: '2024',
    description: 'Led development of interactive websites and financial strategies.',
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false); // false = right
  const nodeRefs = useRef([]);

  const [hasMoved, setHasMoved] = useState(false); // ← new flag
  const handleArrowClick = (direction) => {
    const newIndex = activeIndex + direction;
  
    if (newIndex >= 0 && newIndex < timelineData.length) {
      setIsRunning(true);
      setActiveIndex(newIndex);
      
      // Toggle direction every time we move (except on initial render)
      if (hasMoved) {
        setFacingLeft((prev) => !prev);
      }

      // Set the movement flag once we leave the first node
      if (!hasMoved && newIndex !== 0) {
        setHasMoved(true);
      }
  
      setTimeout(() => {
        setIsRunning(false);
      }, 700);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleArrowClick(-1); // Left = Previous
      } else if (e.key === 'ArrowRight') {
        handleArrowClick(1); // Right = Next
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isRunning, hasMoved]); // dependencies that affect movement
  

  return (
    <div>
        {/* Hero section */}
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Hey, I'm Nick 👋</h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
                I'm a developer, athlete, and builder of interactive digital experiences.
            </p>
        </div>

        {/* Split grid Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-12 max-w-6xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
                <p className="text-gray-300 leading-relaxed">
                I'm currently studying CS and Stats at Columbia, building frontends, backends,
                and smart systems. Outside of that, I sprint the 400m and explore the edges
                of design, physics, and finance.
                </p>
            </div>
            <div className="flex justify-center">
                <img src="/images/avatar.jpg" alt="Avatar" className="rounded-full w-56 h-56 object-cover shadow-lg" />
            </div>
        </div>

        {/* Highlight section */}
        <div className="flex flex-wrap justify-center gap-4 px-6 py-8">
            <div className="bg-gray-800 px-6 py-4 rounded-lg shadow text-white font-medium">
                💻 Loves building interfaces
            </div>
            <div className="bg-gray-800 px-6 py-4 rounded-lg shadow text-white font-medium">
                🏃 Ran 47.00 in the 400m
            </div>
            <div className="bg-gray-800 px-6 py-4 rounded-lg shadow text-white font-medium">
                🧠 Fascinated by AI & markets
            </div>
        </div>

        {/* Timeline section */}
        <div className="relative bg-[#0f172a] text-white overflow-hidden pb-12">
            <h1 className="text-4xl font-bold text-center pt-10 pb-6">About Me</h1>

            {/* Wrapper to push entire timeline content down */}
            <div className="relative flex flex-col" id="timeline-container">
                <AthleteSprite
                activeIndex={activeIndex}
                isRunning={isRunning}
                facingLeft={facingLeft}
                nodeRefs={nodeRefs}
                />

                <TimelineNode 
                timelineData={timelineData} 
                activeIndex={activeIndex} 
                nodeRefs={nodeRefs}
                />

                <div className="relative flex gap-4 justify-center">
                    <button
                        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => handleArrowClick(-1)}
                    >
                        ↑ Prev
                    </button>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => handleArrowClick(1)}
                    >
                        ↓ Next
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
}
