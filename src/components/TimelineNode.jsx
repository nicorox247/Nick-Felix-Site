// src/components/TimelineNode.jsx
import { motion } from 'framer-motion';

export default function TimelineNode({ timelineData, activeIndex, nodeRefs }) {
  return (
    <div className="relative flex flex-col pb-10 items-center">
      {timelineData.map((item, index) => {
        const isLeft = index % 2 === 0;
        const isActive = index === activeIndex;

        // Tailwind responsive translation for node positioning
        const xOffset = isLeft
          ? '-translate-x-1/4 md:-translate-x-1/3 lg:-translate-x-1/2 xl:-translate-x-[75%]'
          : 'translate-x-1/4 md:translate-x-1/3 lg:translate-x-1/2 xl:translate-x-[75%]';

        return (
          <div key={index} className="relative flex flex-col items-center">
            {/* Timeline Node */}
            <motion.div
              initial={index < 2 ? false : { opacity: 0, y: 50 }}
              whileInView={index === 0 ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            
            >

            <div
              ref={(el) => (nodeRefs.current[index] = el)}
              className={`transition-all duration-700 rounded-lg bg-gradient-to-bl from-primary to-red-700 shadow-md px-6 py-4
                max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                w-full ${xOffset} 
                ${isActive ? 'bg-blue-200 ring-4 ring-blue-400' : ''}`}
                >
              <h3 className="font-bold text-xl text-light">
                {item.title || item.year}
              </h3>
              <p className="text-light text-base sm:text-lg">
                {item.description}
              </p>
            </div>

            {/* Connector Line */}
            {index < timelineData.length - 1 && (
              <div className="h-30 flex justify-center items-center">
                <div
                  className="w-1 h-full bg-dark"
                  style={{
                    transform: isLeft ? 'rotate(-45deg)' : 'rotate(45deg)',
                    transformOrigin: 'top center',
                  }}
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
