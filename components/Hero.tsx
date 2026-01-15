import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TextPressure from './TextPressure';

interface HeroProps {
  theme: 'light' | 'dark';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const { scrollY } = useScroll();

  const smoothScroll = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothScroll, [0, 500], [1, 0]);
  const y = useTransform(smoothScroll, [0, 500], [0, -80]);
  const scale = useTransform(smoothScroll, [0, 500], [1, 0.95]);
  
  const blurValue = useTransform(smoothScroll, [0, 500], ["0px", "4px"]);

  const isDark = theme === 'dark';

  return (
    <motion.section 
      style={{ 
        opacity, 
        y, 
        scale, 
        filter: `blur(${blurValue})`,
        willChange: "transform, opacity, filter"
      }}
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 md:px-8 overflow-hidden z-10"
    >
      {}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] md:blur-[220px] transition-all duration-1000 
          ${isDark ? 'bg-blue-400 opacity-20' : 'bg-blue-200 opacity-15'}`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[100vw] mx-auto"
      >
        <div className="mb-8 md:mb-12 px-2 overflow-visible">
          <TextPressure
            text="Shourya Mishra"
            width={true}
            weight={true}
            italic={false}
            alpha={false}
            flex={true}
            textColor={isDark ? "#ffffff" : "#000000"}
          
            className="text-[9.5vw] md:text-[8.5vw] font-black tracking-tighter uppercase leading-[0.9] w-full whitespace-nowrap"
          />
        </div>

        {}
        <p
          className={`text-[10px] md:text-lg font-mono tracking-[0.25em] md:tracking-[0.45em] uppercase flex flex-wrap justify-center items-center gap-x-3 md:gap-x-10 gap-y-3 max-w-5xl mx-auto transition-colors duration-700 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}
        >
          <span>Engineering</span>
          <span className={isDark ? 'text-zinc-800' : 'text-zinc-300'}>•</span>
          <span>Robotics</span>
          <span className={isDark ? 'text-zinc-800' : 'text-zinc-300'}>•</span>
          <span>Software</span>
          <span className={isDark ? 'text-zinc-800' : 'text-zinc-300'}>•</span>
          <span>Design</span>
        </p>
      </motion.div>

      {}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 md:bottom-14 flex flex-col items-center gap-3 p-4"
      >
        <span className={`text-[8px] uppercase tracking-[1em] font-mono transition-colors duration-700 ${isDark ? 'text-zinc-700' : 'text-zinc-500'}`}>
          Secure Connection
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-700 ${isDark ? 'text-zinc-800' : 'text-zinc-400'}`} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;

