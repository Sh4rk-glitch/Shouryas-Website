
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
  { id: 'react', name: 'React', icon: <Globe size={24} />, color: '#61DAFB' },
  { id: 'node', name: 'Node.js', icon: <Zap size={24} />, color: '#339933' },
  { id: 'ts', name: 'TypeScript', icon: <Code2 size={24} />, color: '#3178C6' },
  { id: 'python', name: 'Python', icon: <Terminal size={24} />, color: '#3776AB' },
  { id: 'java', name: 'Java', icon: <Box size={24} />, color: '#007396' },
  { id: 'supabase', name: 'Supabase', icon: <Database size={24} />, color: '#3ECF8E' },
  { id: 'vite', name: 'Vite', icon: <Box size={24} />, color: '#2496ED' },
  { id: 'linux', name: 'Linux', icon: <Code size={24} />, color: '#FCC624' },
  { id: 'git', name: 'Git', icon: <Github size={24} />, color: '#F05032' },
  { id: 'arduino', name: 'Arduino', icon: <Cpu size={24} />, color: '#00979D' },
  { id: 'tailwind', name: 'Tailwind', icon: <Wind size={24} />, color: '#06B6D4' },
  { id: 'qmk', name: 'QMK', icon: <Layers size={24} />, color: '#FFB000' },
  { id: 'onShape', name: 'OnShape', icon: <Boxes size={24} />, color: '#F24E1E' },
  { id: 'fusion360', name: 'Fusion 360', icon: <BoxSelect size={24} />, color: '#F5792A' },
  { id: 'cpp', name: 'C++', icon: <Settings size={24} />, color: '#00599C' },
  { id: 'Apps', name: 'Apps', icon: <Smartphone size={24} />, color: '#F05138' },
  { id: 'postgres', name: 'PostgreSQL', icon: <DatabaseBackupIcon size={24} />, color: '#336791' },
  { id: 'aws', name: 'AWS', icon: <Cloud size={24} />, color: '#FF9900' }
];

const TechItemBubble: React.FC<{ item: TechItem; isDark: boolean }> = ({ item, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center"
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
          ${isDark ? 'border-white/10 bg-zinc-900/90' : 'border-stone-300/80 bg-[#e3dbcc]/90'}`}
        style={{
          width: isHovered ? '210px' : '96px',
          height: isHovered ? '210px' : '96px',
          borderWidth: '1.5px',
          boxShadow: isHovered ? `0 20px 60px ${item.color}33` : 'none',
        }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{ 
            background: `radial-gradient(circle at center, ${item.color}22 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.05
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.6 : 1,
              y: isHovered ? -18 : 0,
              color: isHovered ? item.color : (isDark ? '#a1a1aa' : '#78716c')
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {item.icon}
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute bottom-12 flex flex-col items-center"
              >
                <span className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap px-4 text-center ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  {item.name}
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 24 }}
                  className="h-[1px] mt-2"
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

  // Symmetrical row mapping: 3, 4, 5, 4, 2.
  // Because centered rows of differing counts (odd/even) naturally stagger, 
  // this layout results in a perfect hexagonal honeycomb without manual translate offsets.
  const rows = [
    { items: techItems.slice(0, 3) },
    { items: techItems.slice(3, 7) },
    { items: techItems.slice(7, 12) },
    { items: techItems.slice(12, 16) },
    { items: techItems.slice(16, 18) },
  ];

  return (
    <section className="relative w-full py-40 overflow-hidden flex flex-col items-center justify-center bg-transparent min-h-[1000px]">
      {/* Background Decorative Elements */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-15' : 'opacity-10'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-dashed rounded-full border-blue-500 animate-[spin_480s_linear_infinite]" />
      </div>

      <div className="mb-32 text-center z-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center gap-4 mb-6"
        >
          <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-800' : 'bg-stone-300'}`} />
          <span className={`text-[10px] font-mono uppercase tracking-[1em] ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            CLUSTER // TECH_V4
          </span>
          <div className={`h-[1px] w-12 ${isDark ? 'bg-zinc-800' : 'bg-stone-300'}`} />
        </motion.div>
        <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          The Full Stack Stack<span className="text-blue-500">.</span>
        </h2>
      </div>

      {/* Spaced-out Hexagonal Cluster */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10 max-w-7xl mx-auto px-4">
        {rows.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            className="flex justify-center gap-8 md:gap-12"
          >
            {row.items.map((tech) => (
              <TechItemBubble key={tech.id} item={tech} isDark={isDark} />
            ))}
          </div>
        ))}
      </div>

      {/* Technical Labels */}
      <div className={`absolute bottom-20 left-12 pointer-events-none hidden xl:block font-mono text-[7px] tracking-[0.4em] leading-relaxed ${isDark ? 'text-zinc-800' : 'text-stone-500'}`}>
        GRID: HEXAGONAL_NATURAL<br />
        OVERLAP_REDUCTION: ENABLED<br />
        ALIGNMENT: CENTER_STAGGER
      </div>
      
      <div className={`absolute bottom-20 right-12 pointer-events-none hidden xl:block font-mono text-[7px] tracking-[0.4em] leading-relaxed text-right ${isDark ? 'text-zinc-800' : 'text-stone-500'}`}>
        CORE_SYSTEM: V4.2<br />
        RESPONSIVE_ADAPT: TRUE<br />
        SYNC_STATUS: NOMINAL
      </div>
    </section>
  );
};

export default TechMarquee;
