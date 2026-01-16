
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
    icon: <Cpu size={20} />,
    tags: ["PCB Design", "C++", "CAD", "QMK", "Firmware"]
  },
  {
    year: "2023 - PRESENT",
    title: "FRC Robotics Member",
    organization: "FIRST Robotics Competition",
    description: "Collaborated in high-pressure environments to build full-scale industrial robots. Focused on drivetrain mechanics and Java-based control systems.",
    icon: <Award size={20} />,
    tags: ["Java", "Mechanics", "Strategy", "PID Control", "Odometry systems"]
  },
  {
    year: "2022 - PRESENT",
    title: "Advanced Robotics Student",
    organization: "STEM Academy",
    description: "Developed Rubik's Cube solving algorithms using Python and computer vision. Integrated hardware sensors with real-time solving logic.",
    icon: <GraduationCap size={20} />,
    tags: ["Python", "Algorithms", "Lego Mindstorms", "C#", "JavaScript"]
  }
];

const Experience: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative py-40 px-6 max-w-5xl mx-auto overflow-hidden">
      <div className="mb-24 text-center">
        <h2 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          Journey Log<span className="text-blue-500">.</span>
        </h2>
        <p className={`font-mono text-[10px] uppercase tracking-[0.4em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Chronological Technical Progression
        </p>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
          <motion.div 
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute inset-0 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>

        {experiences.map((exp, index) => (
          <div key={index} className={`relative flex items-center justify-between mb-24 md:mb-32 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            {/* Content Card */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`w-full md:w-[42%] p-8 rounded-3xl border transition-all duration-500 group
                ${isDark 
                  ? 'bg-zinc-900/40 border-white/5 hover:border-blue-500/30' 
                  : 'bg-white border-zinc-200 shadow-xl shadow-zinc-200/20'}`}
            >
              <span className="font-mono text-[10px] tracking-widest text-blue-500 mb-2 block">{exp.year}</span>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>{exp.title}</h3>
              <p className={`text-xs font-mono mb-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{exp.organization}</p>
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className={`text-[8px] font-mono font-bold px-2 py-1 rounded-md border ${isDark ? 'border-white/5 text-zinc-500' : 'border-zinc-100 text-zinc-400'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Icon Node */}
            <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl flex items-center justify-center z-10 transition-all duration-500 
              ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'} border shadow-lg group-hover:scale-110`}>
              {exp.icon}
            </div>

            {/* Spacer for Desktop */}
            <div className="hidden md:block w-[42%]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
