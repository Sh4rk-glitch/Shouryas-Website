
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Terminal, 
  Zap, 
  Layers, 
  Wind, 
  Github, 
  Box,
  BoxSelect,
  Smartphone,
  Cloud,
  Settings,
  Code,
  Boxes,
  DatabaseBackupIcon
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const techItems: TechItem[] = [
  { id: 'react', name: 'React', icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, color: '#61DAFB' },
  { id: 'node', name: 'Node.js', icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, color: '#339933' },
  { id: 'ts', name: 'TypeScript', icon: <Code2 className="w-5 h-5 md:w-6 md:h-6" />, color: '#3178C6' },
  { id: 'python', name: 'Python', icon: <Terminal className="w-5 h-5 md:w-6 md:h-6" />, color: '#3776AB' },
  { id: 'java', name: 'Java', icon: <Box className="w-5 h-5 md:w-6 md:h-6" />, color: '#007396' },
  { id: 'supabase', name: 'Supabase', icon: <Database className="w-5 h-5 md:w-6 md:h-6" />, color: '#3ECF8E' },
  { id: 'vite', name: 'Vite', icon: <Box className="w-5 h-5 md:w-6 md:h-6" />, color: '#2496ED' },
  { id: 'linux', name: 'Linux', icon: <Code className="w-5 h-5 md:w-6 md:h-6" />, color: '#FCC624' },
  { id: 'git', name: 'Git', icon: <Github className="w-5 h-5 md:w-6 md:h-6" />, color: '#F05032' },
  { id: 'arduino', name: 'Arduino', icon: <Cpu className="w-5 h-5 md:w-6 md:h-6" />, color: '#00979D' },
  { id: 'tailwind', name: 'Tailwind', icon: <Wind className="w-5 h-5 md:w-6 md:h-6" />, color: '#06B6D4' },
  { id: 'qmk', name: 'QMK', icon: <Layers className="w-5 h-5 md:w-6 md:h-6" />, color: '#FFB000' },
  { id: 'onShape', name: 'OnShape', icon: <Boxes className="w-5 h-5 md:w-6 md:h-6" />, color: '#F24E1E' },
  { id: 'fusion360', name: 'Fusion 360', icon: <BoxSelect className="w-5 h-5 md:w-6 md:h-6" />, color: '#F5792A' },
  { id: 'cpp', name: 'C++', icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />, color: '#00599C' },
  { id: 'Apps', name: 'Apps', icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6" />, color: '#F05138' },
  { id: 'postgres', name: 'PostgreSQL', icon: <DatabaseBackupIcon className="w-5 h-5 md:w-6 md:h-6" />, color: '#336791' },
  { id: 'aws', name: 'AWS', icon: <Cloud className="w-5 h-5 md:w-6 md:h-6" />, color: '#FF9900' }
];

const TechItemBubble: React.FC<{ item: TechItem; isDark: boolean }> = ({ item, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center shrink-0"
      style={{ zIndex: isHovered ? 100 : 1 }}
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        className={`relative flex flex-col items-center justify-center rounded-full cursor-target overflow-hidden shadow-2xl transition-all duration-300
          ${isDark ? 'border-white/10 bg-zinc-900/95' : 'border-stone-300/80 bg-[#e3dbcc]/95'}`}
        style={{
          width: isHovered ? 'clamp(110px, 22vw, 180px)' : 'clamp(56px, 10vw, 86px)',
          height: isHovered ? 'clamp(110px, 22vw, 180px)' : 'clamp(56px, 10vw, 86px)',
          borderWidth: '1.5px',
          boxShadow: isHovered ? `0 20px 60px ${item.color}33` : 'none',
        }}
      >
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{ 
            background: `radial-gradient(circle at center, ${item.color}22 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.05
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.4 : 1,
              y: isHovered ? -12 : 0,
              color: isHovered ? item.color : (isDark ? '#a1a1aa' : '#78716c')
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {item.icon}
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 5 }}
                className="absolute bottom-6 md:bottom-10 flex flex-col items-center"
              >
                <span className={`font-mono text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap px-4 text-center ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  {item.name}
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 14 }}
                  className="h-[1.5px] mt-1.5"
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const TechMarquee: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const isDark = theme === 'dark';

  // 18 items in a 4-3-4-3-4 pattern.
  // This distribution creates a natural hexagonal honeycomb interlock when centered.
  const rowCounts = [4, 3, 4, 3, 4];
  let currentIdx = 0;
  const rows = rowCounts.map(count => {
    const slice = techItems.slice(currentIdx, currentIdx + count);
    currentIdx += count;
    return slice;
  });

  return (
    <section className="relative w-full py-32 md:py-64 overflow-hidden flex flex-col items-center justify-center bg-transparent min-h-[800px] md:min-h-[1200px]">
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-10' : 'opacity-5'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[1300px] md:h-[1300px] border border-zinc-500/10 rounded-full animate-[spin_600s_linear_infinite]" />
      </div>

      <div className="mb-24 md:mb-40 text-center z-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center gap-4 mb-6"
        >
          <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-800' : 'bg-stone-300'}`} />
          <span className={`text-[10px] font-mono uppercase tracking-[1em] ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            HONEYCOMB_SYSTEM_V6
          </span>
          <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-800' : 'bg-stone-300'}`} />
        </motion.div>
        <h2 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          The Full Stack Stack<span className="text-blue-500">.</span>
        </h2>
      </div>

      {/* Spaced-out Interlocking Staggered Grid */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto px-4">
        {rows.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            className="flex justify-center gap-6 md:gap-14 w-full"
            style={{ 
              // Moving row n+1 up into the gaps of row n creates the hex effect
              marginTop: rowIndex > 0 ? 'clamp(-12px, -3vw, -28px)' : '0' 
            }}
          >
            {row.map((tech) => (
              <TechItemBubble key={tech.id} item={tech} isDark={isDark} />
            ))}
          </div>
        ))}
      </div>

      <div className={`absolute bottom-20 left-10 pointer-events-none hidden xl:block font-mono text-[9px] tracking-[0.4em] leading-relaxed ${isDark ? 'text-zinc-800' : 'text-stone-500'}`}>
        PATTERN: 4-3-4-3-4_STAGGER<br />
        GEOMETRY: TRUE_HEXAGONAL<br />
        SYNC_STATE: ALIGNED<br />
        DISTRIBUTION: OPTIMAL
      </div>
    </section>
  );
};

export default TechMarquee;
