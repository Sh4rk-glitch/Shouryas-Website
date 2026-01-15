
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, AlertCircle } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface ProjectCardProps {
  project: Project;
  index: number;
  theme: 'light' | 'dark';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, theme }) => {
  const [showWarning, setShowWarning] = useState(false);
  const isDark = theme === 'dark';
  const borderRadius = 24;

  const handleClick = (e: React.MouseEvent) => {
    if (!project.link) {
      e.preventDefault();
      setShowWarning(true);
    }
  };

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => setShowWarning(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const CardWrapper = project.link ? 'a' : 'div';
  const wrapperProps = project.link ? { 
    href: project.link, 
    target: "_blank", 
    rel: "noopener noreferrer" 
  } : {
    onClick: handleClick
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full cursor-target relative"
    >
      <ElectricBorder
        color={showWarning ? "#ef4444" : (isDark ? "#3b82f6" : "#2563eb")}
        speed={showWarning ? 1.5 : 0.7}
        chaos={showWarning ? 0.3 : 0.1}
        borderRadius={borderRadius}
        className="group h-full"
      >
        <CardWrapper
          {...wrapperProps}
          className={`relative rounded-[24px] overflow-hidden transition-all duration-500 border h-full flex flex-col block no-underline
            ${isDark 
              ? 'bg-zinc-900/80 border-zinc-800/50 group-hover:border-blue-500/30 backdrop-blur-sm' 
              : 'bg-white/90 border-zinc-200 group-hover:border-zinc-300 shadow-sm backdrop-blur-sm'}`}
        >
          <div className="aspect-video overflow-hidden relative flex-shrink-0">
            <div className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none
              ${isDark ? 'bg-gradient-to-t from-zinc-950/80 to-transparent' : 'bg-gradient-to-t from-white/40 to-transparent'}`} 
            />
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700
                ${isDark 
                  ? 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105' 
                  : 'grayscale-[0.4] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105'}`}
            />
            
            <AnimatePresence>
              {showWarning && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute inset-0 z-30 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
                >
                  <div className="flex flex-col items-center gap-4 text-white text-center p-6">
                    <AlertCircle size={32} className="text-red-500 animate-pulse" />
                    <p className="font-mono text-xs uppercase tracking-[0.2em]">
                      This project doesn't have a link yet
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-8 relative z-20 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-2xl font-black tracking-tight uppercase
                ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                {project.title}
              </h3>
              <ExternalLink className={`w-5 h-5 transition-all duration-300
                ${isDark ? 'text-zinc-600 group-hover:text-blue-400' : 'text-zinc-400 group-hover:text-zinc-900'}
                ${!project.link ? 'opacity-20' : ''}`} 
              />
            </div>
            
            <p className={`mb-8 leading-relaxed font-medium flex-grow
              ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.techStack.map(tech => (
                <span 
                  key={tech} 
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border transition-colors
                    ${isDark 
                      ? 'bg-blue-500/5 border-blue-500/20 text-blue-400 group-hover:border-blue-500/40' 
                      : 'bg-zinc-100 border-zinc-200 text-zinc-700'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardWrapper>
      </ElectricBorder>
    </motion.div>
  );
};

export default ProjectCard;
