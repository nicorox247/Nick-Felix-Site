// src/pages/About.jsx
import { useState, useRef, useEffect, useMemo } from 'react';
import AthleteSprite from '../components/AthleteSprite';
import TimelineNode from '../components/TimelineNode';
import ProjectTagTicker from '../components/ProjectTagTicker';
import projectData from '../data/projects';
import '../styles/About.css';

const timelineData = [
  {
    title: 'Who I am',
    description: 'I\'m currently studying CS and Stats at Columbia, building frontends, backends, models, and smart systems. Outside of that, I sprint the 400m and love to surf.',
  },
  {
    title: 'The Builder',
    description:
      'I love making things. Whether quantitative or qualitative, solving problems and delivering high-quality, efficient solutions is my forte.',
    keywords: ['engineering', 'problem-solving', 'systems', 'full-stack', 'strategy'],
  },
  {
    title: 'The Competitor',
    description:
      'As a 400m sprinter, the discipline and structure of elite athletics shape much of how I approach life. I\’m calm under pressure, calculated/optimized in strategy, and willing to do what it takes for victory',
    keywords: ['athlete', 'track', 'grit', 'discipline', 'performance'],
  },
  {
    title: 'The Analyst',
    description:
      'I perfer interpreting reality by breaking every piece of it to it\'s most fundamental components and building back up. CS and statistics bolster my naturally analytical mind to better quantify and understand these patterns.',
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
      'I want to build systems that matter; tools that empower people, businesses that make sense, and experiences that leave a mark. I\’m just getting started.',
    keywords: ['vision', 'impact', 'entrepreneurship', 'product', 'future'],
  },
];


export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false); // false = right
  const nodeRefs = useRef([]);

  const allTags = useMemo(() => {
    return [...new Set(
      projectData.flatMap(p => p.tags).filter(tag => typeof tag === 'string')
    )];
  }, [projectData]);

  const speedPerItem = 0.75; // seconds per tag (tweak to your liking)
const duration = allTags.length * speedPerItem;


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
    <div className="">
      <div className='mt-10'>
        <h1 className='text-lg mb-6'>Skills, Frameworks, and Technologies</h1>
        <ProjectTagTicker tags={allTags} />
      </div>
        {/* Split grid Bio Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 py-12  mx-auto">
            <div className="text-center py-16">
                <h1 className="text-4xl font-bold mb-4">Hey, I'm Nick 👋</h1>
                <p className="text-muted text-lg max-w-xl mx-auto">
                    I'm a developer, athlete, and student of life.
                </p>
            </div>
            <div className="flex justify-center">
                <img src="/images/avatar.jpg" alt="Avatar" className="rounded-full w-56 h-56 object-cover shadow-lg" />
            </div>
        </div>

        {/* Instruction above timeline */}
        <p className="text-center text-sm text-muted animate-wave">
          Use the buttons below or your ← / → keyboard arrows to explore.
        </p>

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

            </div>
        </div>

        {/* Sticky nav buttons */}
        <div className="sticky bottom-10 z-30 flex justify-center gap-4 px-6">
          <button
            className="px-4 py-2 rounded button-primary shadow-md"
            onClick={() => handleArrowClick(-1)}
          >
            ← Prev
          </button>
          <button
            className="px-4 py-2 rounded button-primary shadow-md"
            onClick={() => handleArrowClick(1)}
          >
            Next →
          </button>
        </div>

    </div>
  );
}
