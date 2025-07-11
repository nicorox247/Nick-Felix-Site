// src/components/TimelineNode.jsx
import { useState, } from 'react';
import { motion } from 'framer-motion';

export default function TimelineNode({ timelineData, activeIndex, nodeRefs }) {

const [viewportAmount, setViewportAmount] = window.innerWidth < 640 ? useState(0.1) : useState(0.3);

  return (
    <div className="relative flex flex-col pb-10 items-center">
      {timelineData.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isActive = index === activeIndex;

        // Tailwind responsive translation for node positioning
        const xOffset = isLeft
          ? '-translate-x-1/20 md:-translate-x-1/3 lg:-translate-x-1/2 xl:-translate-x-[75%]'
          : 'translate-x-1/20 md:translate-x-1/3 lg:translate-x-1/2 xl:translate-x-[75%]';

        const activeStyle = isLeft ? 'node-left' : 'node-right';

        return (
          <div key={index} className="relative flex flex-col items-center">
            {/* Timeline Node */}
            <motion.div
              initial={index < 2 ? false : { opacity: 0, y: 50 }}
              whileInView={index === 0 ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: viewportAmount }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            
            >

            <div
              ref={(el) => (nodeRefs.current[index] = el)}
              data-index={index}
              className={`transition-all duration-700 rounded-lg bg-node shadow-md px-6 py-4
                max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                w-full mx-auto ${xOffset} ${isLeft ? "bg-node-left" : "bg-node-right"}
                ${isActive ? `ring-4 ring-light shadow-dark ${activeStyle}` : ''}`}
                >
              <h1 className="font-bold text-3xl text-light pb-2">
                {item.title || item.description}
              </h1>
              <p className="text-light text-xl sm:text-lg">
                {item.description}
              </p>
            </div>

            {/* Connector Line */}
            {index < timelineData.length - 1 && (
              <div className="h-25 flex justify-center items-center">
                <div
                    className={`w-1 h-full bg-dark origin-top 
                    ${isLeft 
                      ? '-rotate-[20deg] md:-rotate-[45deg]' 
                      : 'rotate-[20deg] md:rotate-[45deg]'}`}
                  />
              </div>
            )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
