import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Cpu } from 'lucide-react';

interface ExperienceItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    year: "2024 - Present",
    title: "Lead Hardware Engineer",
    organization: "Personal Lab // EGKey Project",
    description: "Architecting split ergonomic keyboards involving custom PCB routing, firmware optimization in QMK/C++, and structural CAD design.",
    icon: <Cpu size={22} />,
    tags: ["PCB Design", "C++", "CAD"]
  },
  {
    year: "2023 - 2024",
    title: "FRC Robotics Member",
    organization: "FIRST Robotics Competition",
    description: "Collaborated in high-pressure environments to build full-scale industrial robots. Focused on drivetrain mechanics and Java-based control systems.",
    icon: <Award size={22} />,
    tags: ["Java", "Mechanics", "Strategy"]
  },
  {
    year: "2022 - 2023",
    title: "Advanced Robotics Student",
    organization: "STEM Academy",
    description: "Developed Rubik's Cube solving algorithms using Python and computer vision. Integrated hardware sensors with real-time solving logic.",
    icon: <GraduationCap size={22} />,
    tags: ["Python", "Algorithms", "Lego Mindstorms"]
  }
];

const Experience: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001
  });

  const axisXClass = "left-10 md:left-24";

  return (
    <section ref={containerRef} className="relative py-32 md:py-64 px-6 md:px-16 max-w-6xl mx-auto overflow-visible">
      <div className="mb-24 md:mb-40">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-[1px] bg-blue-500" />
          <span className={`font-mono text-[10px] uppercase tracking-[0.5em] ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            CHRONO_TRACKER
          </span>
        </motion.div>
        <h2 className={`text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          Journey Log<span className="text-blue-500">.</span>
        </h2>
      </div>

      <div className="relative">
        {/* Persistent Timeline Track (The Rail) */}
        <div 
          className={`absolute ${axisXClass} top-0 bottom-0 w-[2px] md:w-[4px] z-0 rounded-full ${isDark ? 'bg-zinc-900' : 'bg-stone-200'}`}
          style={{ transform: 'translateX(-50%)' }} 
        >
          {/* Active Progress Overlay (The Glow Line) */}
          <motion.div 
            style={{ 
              scaleY, 
              originY: 0,
            }}
            className="absolute inset-0 bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.6)] z-10 rounded-full"
          />
        </div>

        <div className="space-y-32 md:space-y-56">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start">
              
              {/* Icon Container */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, x: "-50%" }}
                whileInView={{ scale: 1, opacity: 1, x: "-50%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  scale: { type: "spring", stiffness: 300, damping: 25, delay: 0.1 },
                  opacity: { duration: 0.5, delay: 0.1 },
                  x: { duration: 0 }
                }}
                className={`absolute ${axisXClass} w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center z-20 shadow-2xl border transition-colors duration-500
                ${isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-500' : 'bg-white border-stone-200 text-stone-400'}`}
              >
                {exp.icon}
              </motion.div>

              {/* Content Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className={`flex-1 ml-24 md:ml-44 p-10 md:p-16 rounded-[3rem] border transition-all duration-500 group relative
                  ${isDark 
                    ? 'bg-zinc-950/40 border-white/5 hover:border-blue-500/20 backdrop-blur-3xl' 
                    : 'bg-white/95 border-stone-200 shadow-2xl shadow-stone-400/10 backdrop-blur-2xl'}`}
              >
                <div className="mb-10">
                  <span className="font-mono text-[10px] md:text-[12px] tracking-widest text-blue-500 uppercase font-black block mb-4">{exp.year}</span>
                  <h3 className={`text-3xl md:text-5xl font-black mb-2 tracking-tight uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>{exp.title}</h3>
                  <p className={`text-[11px] md:text-sm font-mono uppercase tracking-[0.2em] ${isDark ? 'text-zinc-600' : 'text-stone-500'}`}>{exp.organization}</p>
                </div>
                
                <p className={`text-lg md:text-xl leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-stone-700'}`}>{exp.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {exp.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-mono font-bold px-5 py-2.5 rounded-xl border transition-all duration-300 ${isDark ? 'border-white/10 text-zinc-500 group-hover:border-blue-500/40 group-hover:text-zinc-300' : 'border-stone-200 text-stone-500 group-hover:border-stone-400 group-hover:text-zinc-900'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
