
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
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
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center p-1 md:p-1.5"
      style={{
        zIndex: isHovered ? 100 : 1,
      }}
    >
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 30,
          mass: 1
        }}
        className={`relative flex flex-col items-center justify-center rounded-full cursor-target overflow-hidden shadow-2xl transition-all duration-300
          ${isDark ? 'border-white/5 bg-zinc-900/95' : 'border-zinc-200 bg-white/95'}`}
        style={{
          width: isHovered ? '180px' : '75px',
          height: isHovered ? '180px' : '75px',
          borderWidth: '1.5px',
          boxShadow: isHovered ? `0 30px 70px ${item.color}33` : 'none',
        }}
      >
        {/* Apple Watch Glow Effect */}
        <div 
          className="absolute inset-0 transition-opacity duration-700"
          style={{ 
            background: `radial-gradient(circle at center, ${item.color}44 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0.1
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <motion.div
            layout
            animate={{ 
              scale: isHovered ? 1.8 : 1,
              y: isHovered ? -20 : 0,
              color: isHovered ? item.color : (isDark ? '#52525b' : '#a1a1aa')
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            {item.icon}
          </motion.div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-12 flex flex-col items-center"
              >
                <span className={`font-mono text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap px-4 text-center ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {item.name}
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 24 }}
                  className="h-[2px] mt-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechMarquee: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const isDark = theme === 'dark';

  // Honeycomb structure: rows are tightly packed
  // Stagger is roughly half of (bubble width + padding)
  const rows = [
    { items: techItems.slice(0, 3), offset: '0' },
    { items: techItems.slice(3, 7), offset: 'md:translate-x-[42px]' },
    { items: techItems.slice(7, 12), offset: '0' },
    { items: techItems.slice(12, 16), offset: 'md:translate-x-[42px]' },
    { items: techItems.slice(16, 18), offset: '0' },
  ];

  return (
    <section className="relative w-full py-40 overflow-hidden flex flex-col items-center justify-center bg-transparent min-h-[900px]">
      {/* Background Decorative Circles */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-25' : 'opacity-10'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-dashed rounded-full border-blue-500/5 animate-[spin_300s_linear_infinite]" />
      </div>

      <div className="mb-24 text-center z-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-4 mb-6"
        >
          <div className={`h-[1px] w-16 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
          <span className={`text-[11px] font-mono uppercase tracking-[1.2em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Core_Technology_Cloud
          </span>
          <div className={`h-[1px] w-16 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
        </motion.div>
        <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          The Full Stack<span className="text-blue-500">.</span>
        </h2>
      </div>

      <LayoutGroup>
        {/* Row Container with tight gaps for honeycomb effect */}
        <div className="relative z-10 flex flex-col items-center gap-1 md:gap-1.5 max-w-7xl mx-auto px-4">
          {rows.map((row, rowIndex) => (
            <motion.div 
              layout
              key={`row-${rowIndex}`}
              className={`flex justify-center gap-1 md:gap-1.5 ${row.offset}`}
            >
              {row.items.map((tech) => (
                <TechItemBubble key={tech.id} item={tech} isDark={isDark} />
              ))}
            </motion.div>
          ))}
        </div> 
      </LayoutGroup>

      {/* Industrial Metadata Labels */}
      <div className={`absolute bottom-20 left-12 pointer-events-none hidden xl:block font-mono text-[7px] tracking-[0.4em] leading-relaxed ${isDark ? 'text-zinc-800' : 'text-zinc-300'}`}>
        CLUSTER_PROTO: HONEYCOMB_V2<br />
        DISPLACEMENT_RADIUS: 180PX<br />
        GRID_SPACING: OPTIMIZED
      </div>
      
      <div className={`absolute bottom-20 right-12 pointer-events-none hidden xl:block font-mono text-[7px] tracking-[0.4em] leading-relaxed text-right ${isDark ? 'text-zinc-800' : 'text-zinc-300'}`}>
        REACTIVE_STAGGER: ACTIVE<br />
        INTERACTION_MODE: FLUID<br />
        PACKET_DENSITY: HIGH
      </div>
    </section>
  );
};

export default TechMarquee;
