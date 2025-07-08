// src/pages/About.jsx
import { useState, useRef, useEffect } from 'react';
import AthleteSprite from '../components/AthleteSprite';
import TimelineNode from '../components/TimelineNode';

const timelineData = [
  {
    title: 'The Builder',
    description:
      'I love making things — apps, systems, or strategies. Whether it’s a digital product or a financial model, I thrive when I’m solving problems with elegant, efficient solutions.',
    keywords: ['engineering', 'problem-solving', 'systems', 'full-stack', 'strategy'],
  },
  {
    title: 'The Competitor',
    description:
      'I’m a 400m sprinter. The discipline, grit, and structure of elite athletics shape how I approach everything — from code to business. I’m calm under pressure and always training for the next level.',
    keywords: ['athlete', 'track', 'grit', 'discipline', 'performance'],
  },
  {
    title: 'The Analyst',
    description:
      'With a background in computer science and statistics, I’m constantly looking for patterns — in data, in people, in markets. I love turning noise into insight.',
    keywords: ['data', 'statistics', 'finance', 'algorithms', 'quant'],
  },
  {
    title: 'The Designer',
    description:
      'I care about how things feel. I build interfaces that are intuitive and beautiful, and I believe function and aesthetics should always reinforce each other.',
    keywords: ['UI/UX', 'design', 'aesthetics', 'accessibility', 'frontend'],
  },
  {
    title: 'The Curious Mind',
    description:
      'I read philosophy, study psychology, explore the edges of AI, and experiment with sound. I believe that curiosity is the fuel for original thinking.',
    keywords: ['AI', 'philosophy', 'psychology', 'music', 'curiosity'],
  },
  {
    title: 'The Vision',
    description:
      'I want to build systems that matter — tools that empower people, businesses that make sense, and experiences that leave a mark. I’m just getting started.',
    keywords: ['vision', 'impact', 'entrepreneurship', 'product', 'future'],
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

  const [isFirstRender, setIsFirstRender] = useState(true);


  useEffect(() => {
    const node = nodeRefs.current[activeIndex];
    if (node && !isFirstRender) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else if (isFirstRender) {
      setIsFirstRender(false); // allow future scrolls
    }
  }, [activeIndex]);
  
  
  

  return (
    <div className="bg-background ">
        {/* Hero section */}
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Hey, I'm Nick 👋</h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
                I'm a developer, athlete, and builder of interactive digital experiences.
            </p>
        </div>

        {/* Split grid Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-12 max-w-6xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
                <p className="leading-relaxed">
                I'm currently studying CS and Stats at Columbia, building frontends, backends,
                and smart systems. Outside of that, I sprint the 400m and explore the edges
                of design, physics, and finance.
                </p>
            </div>
            <div className="flex justify-center">
                <img src="/images/avatar.jpg" alt="Avatar" className="rounded-full w-56 h-56 object-cover shadow-lg" />
            </div>
        </div>


        {/* Timeline section */}
        <div className="relative overflow-hidden pb-12 ">
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

                <div className="relative flex gap-4 justify-center ">
                    <button
                        className="px-4 py-2 rounded"
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
