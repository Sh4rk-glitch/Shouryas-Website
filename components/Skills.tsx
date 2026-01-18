import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Code, Cpu, Layers, Terminal, Hexagon } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  size: string;
  color: string;
  details: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Software Architecture",
    icon: <Code size={22} />,
    skills: ["Java", "Python", "TypeScript", "React", "Supabase", "Node.js"],
    size: "col-span-1 md:col-span-2",
    color: "#3b82f6",
    details: "High-performance systems and full-stack integration."
  },
  {
    title: "Hardware Engineering",
    icon: <Cpu size={22} />,
    skills: ["PCB Routing", "Circuitry", "Soldering", "Firmware", "QMK"],
    size: "col-span-1",
    color: "#ec4899",
    details: "Custom input devices and embedded systems."
  },
  {
    title: "Industrial Design",
    icon: <Layers size={22} />,
    skills: ["Onshape", "3D Modeling", "UI/UX", "Rapid Prototyping"],
    size: "col-span-1",
    color: "#0ea5e9",
    details: "Functional aesthetics and mechanical structural design."
  },
  {
    title: "DevOps & Tooling",
    icon: <Terminal size={22} />,
    skills: ["Linux", "Git", "Docker", "Vercel", "Vite", "CI/CD"],
    size: "col-span-1 md:col-span-2",
    color: "#f59e0b",
    details: "Scalable infrastructure and automated deployment pipelines."
  }
];

interface SkillCardProps {
  cat: SkillCategory;
  isDark: boolean;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ cat, isDark, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt effects
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowBackground = useTransform(
    [mouseX, mouseY],
    (latest: any[]) => {
      const x = latest[0] as number;
      const y = latest[1] as number;
      return `radial-gradient(400px circle at ${x + 250}px ${y + 250}px, ${cat.color}15, transparent 65%)`;
    }
  );

  return (
    <motion.div 
      className={`${cat.size} group relative p-4`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      style={{ perspective: 1200 }}
    >
      <ElectricBorder 
        color={isDark ? cat.color : `${cat.color}CC`}
        borderRadius={32}
        speed={0.4}
        chaos={0.06}
      >
        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, z: 20 }}
          className={`relative p-10 rounded-[32px] h-full flex flex-col justify-between overflow-hidden transition-all duration-500 cursor-target border transform-gpu
            ${isDark 
              ? 'bg-zinc-950/80 border-white/5 group-hover:bg-zinc-900/90' 
              : 'bg-[#ede8dc]/95 shadow-2xl shadow-stone-400/30 border-stone-300 group-hover:bg-[#e6dfd1]'}`}
        >
          {/* Mouse-following Glow */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{ background: glowBackground }}
          />

          {/* Industrial Corner Markings */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-zinc-700/50 group-hover:border-blue-500/50 transition-colors" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-zinc-700/50 group-hover:border-blue-500/50 transition-colors" />

          <div className="relative z-10 pointer-events-none">
            <motion.div 
              style={{ z: 40, color: cat.color }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                ${isDark ? 'bg-zinc-800 text-white shadow-2xl' : 'bg-stone-300 text-stone-900 shadow-md'}`}
            >
              {cat.icon}
            </motion.div>
            
            <motion.h3 
              style={{ z: 30 }}
              className={`text-2xl font-black uppercase mb-3 ${isDark ? 'text-white' : 'text-zinc-900'}`}
            >
              {cat.title}
            </motion.h3>
            
            <motion.p 
              style={{ z: 25 }}
              className={`text-[10px] font-mono uppercase tracking-wider mb-8 leading-relaxed ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}
            >
              {cat.details}
            </motion.p>
          </div>

          <motion.div 
            style={{ z: 35 }}
            className="flex flex-wrap gap-2.5 mt-auto relative z-10"
          >
            {cat.skills.map(skill => (
              <span 
                key={skill} 
                className={`text-[9px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg border transition-all duration-300
                  ${isDark 
                    ? 'border-white/5 bg-white/5 text-zinc-400 group-hover:text-white group-hover:border-white/10' 
                    : 'border-stone-400/50 bg-stone-300/40 text-stone-800 group-hover:text-zinc-900 group-hover:border-stone-500'}`}
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <div 
            className="absolute bottom-0 left-0 h-1 transition-all duration-700 w-0 group-hover:w-full z-20"
            style={{ 
              backgroundColor: cat.color, 
              boxShadow: `0 0 20px ${cat.color}CC` 
            }}
          />
        </motion.div>
      </ElectricBorder>
    </motion.div>
  );
};

const Skills: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section className="py-40 px-6 max-w-6xl mx-auto relative overflow-hidden">
      <div className="mb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-12 h-[1px] bg-blue-500" />
          <span className={`font-mono text-[10px] uppercase tracking-[0.5em] ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            SUB_SYSTEM // TECH_STACK
          </span>
        </motion.div>
        
        <h2 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          Technical Arsenal<span className="text-blue-500">.</span>
        </h2>
        
        <p className={`font-mono text-xs uppercase tracking-widest max-w-xl leading-relaxed ${isDark ? 'text-zinc-500' : 'text-stone-700'}`}>
          A multi-disciplinary stack optimized for rapid engineering and high-end software delivery. 
          Current capacity: [OPTIMAL]
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative z-10">
        {skillCategories.map((cat, i) => (
          <SkillCard key={i} cat={cat} isDark={isDark} index={i} />
        ))}
      </div>

      {/* Spaced Out Hexagon Pattern */}
      <div className="absolute top-[20%] left-[-10%] opacity-[0.015] pointer-events-none">
        <Hexagon size={1200} className="text-blue-500 animate-[spin_120s_linear_infinite]" />
      </div>
      
      <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.01] pointer-events-none">
        <Hexagon size={800} className="text-blue-400 animate-[spin_90s_linear_infinite_reverse]" />
      </div>
    </section>
  );
};

export default Skills;
