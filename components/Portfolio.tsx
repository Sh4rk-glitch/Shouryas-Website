
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import ScrollFloat from './ScrollFloat';

interface PortfolioProps {
  theme: 'light' | 'dark';
}

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  return (
    <section 
      ref={containerRef} 
      id="portfolio" 
      className={`relative z-20 w-full py-64 px-4 md:px-8 bg-transparent transition-colors duration-1000`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-48 text-center md:text-left">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            className={`h-[2px] mb-12 mx-auto md:mx-0 transition-colors duration-700 ${isDark ? 'bg-zinc-700' : 'bg-zinc-400'}`}
          />
          <span className={`text-[11px] font-mono uppercase tracking-[1em] block mb-12 transition-colors duration-700 ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
            ENGINEERING_LOG // PROJECTS
          </span>
          
          <div className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.7] select-none space-y-4">
            <ScrollFloat
              containerClassName="justify-center md:justify-start"
              textClassName={isDark ? 'text-white' : 'text-zinc-900'}
              scrollStart="top bottom-=20%"
              scrollEnd="bottom center"
            >
              Built to
            </ScrollFloat>
            <ScrollFloat
              containerClassName="justify-center md:justify-start"
              textClassName={isDark ? 'text-zinc-900' : 'text-zinc-300'}
              scrollStart="top bottom-=10%"
              scrollEnd="bottom center+=10%"
            >
              Endure
            </ScrollFloat>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32 mb-20">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
