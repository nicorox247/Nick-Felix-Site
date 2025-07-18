// src/pages/About.jsx
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import AthleteSprite from '../components/AthleteSprite';
import TimelineNode from '../components/TimelineNode';
import ProjectTagTicker from '../components/ProjectTagTicker';
import AvatarFlicker from '../components/AvatarFlicker';
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
  const [facingLeft, setFacingLeft] = useState(false);
  const nodeRefs = useRef([]);
  const arrowTriggeredRef = useRef(false);
  const [isFirstRender, setIsFirstRender] = useState(true);


  const allTags = useMemo(
    () => [...new Set(projectData.flatMap(p => p.stack).filter(t => typeof t === 'string'))],
    [projectData]
  );

  // Arrow / jump handler stays the same:
  const handleArrowClick = useCallback((direction) => {
    const newIndex = activeIndex + direction;
    if (newIndex < 0 || newIndex >= timelineData.length) return;

    arrowTriggeredRef.current = true;
    setIsRunning(true);
    setActiveIndex(newIndex);
    setFacingLeft(newIndex % 2 === 0);     // parity-based
    setTimeout(() => setIsRunning(false), 700);
  }, [activeIndex]);

  // Simplified scroll logic:
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const midY = window.innerHeight * 4/6;
        const bandTop = midY;
        const bandBottom = midY + 1;  // 1px tall

        let newActive = activeIndex;
        nodeRefs.current.forEach((node, i) => {
          if (!node) return;
          const { top, bottom } = node.getBoundingClientRect();
          if (top < bandBottom && bottom > bandTop) {
            newActive = i;
          }
        });

        if (newActive !== activeIndex) {
          const direction = newActive > activeIndex ? 1 : -1;
          handleArrowClick(direction);
          arrowTriggeredRef.current = false;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeIndex]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') handleArrowClick(-1);
      if (e.key === 'ArrowRight') handleArrowClick(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleArrowClick]);
  

  //Arrow click auto scroll
  // useEffect(() => {
  //   const node = nodeRefs.current[activeIndex];
  //   if (!isFirstRender && arrowTriggeredRef.current && node) {
  //     node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     arrowTriggeredRef.current = false;
  //   }
  //   if (isFirstRender) {
  //     setIsFirstRender(false);
  //   }
  // }, [activeIndex]);
  
  

  return (
    <div className="">
      <div className='mt-10'>
        <h1 className='text-lg mb-6'>Skills, Frameworks, and Technologies</h1>
        <ProjectTagTicker tags={allTags} />
      </div>
        {/* Split grid Bio Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10 items-center px-6 py-12 mx-auto">
            <div className="text-center py-10 sm:py-16">
                <h1 className="text-4xl font-bold mb-4">Hey, I'm Nick 👋</h1>
                <p className="text-muted text-lg max-w-xl mx-auto">
                    I'm a developer, statistician, athlete, and student of life.
                </p>
            </div>
            <div className="flex justify-center">
                <AvatarFlicker/>
            </div>
        </div>

        {/* Instruction above timeline */}
        <p className="text-center text-sm text-muted animate-wave">
          Scroll to explore.
        </p>
        {/* <p className="text-center text-sm text-muted animate-wave">
          Scroll or click ← / → keyboard arrows to explore.
        </p> */}

        {/* Timeline section */}
        <div className="relative overflow-hidden pb-12 ">
            <h1 className="text-4xl font-bold text-center pt-10 pb-6">About Me</h1>

            {/* Scrolling Debugger div */}
            {/* <div 
            style={{
              position: 'fixed',
              top: '50vh',
              height: '1px',
              width: '100%',
              border: '2px dashed red',
              pointerEvents: 'none',
              zIndex: 9999,
            }}/> */}


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
        {/* <div className="sticky bottom-10 z-30 flex justify-center gap-4 px-6">
          <button
            className="px-4 py-2 rounded button-secondary shadow-md"
            onClick={() => handleArrowClick(-1)}
          >
            ← Prev
          </button>
          <button
            className="px-4 py-2 rounded button-secondary shadow-md"
            onClick={() => handleArrowClick(1)}
          >
            Next →
          </button>
        </div> */}

    </div>
  );
}
