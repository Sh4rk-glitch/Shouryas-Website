
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight, Cpu, Globe, Zap } from 'lucide-react';

interface SocialsSectionProps {
  theme: 'light' | 'dark';
}

interface SocialCardProps {
  social: {
    id: string;
    name: string;
    icon: React.ReactNode;
    url: string;
    tag: string;
    color: string;
    features: React.ElementType[];
  };
  index: number;
  springProgress: any;
  theme: 'light' | 'dark';
}

// Fixed: Explicitly typed SocialCard as React.FC to resolve the 'key' property error during component mapping
const SocialCard: React.FC<SocialCardProps> = ({ social, index, springProgress, theme }) => {
  const isDark = theme === 'dark';
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const y = useTransform(springProgress, [0.1, 0.4 + index * 0.08], [150, 0]);
  const rotateX = useTransform(springProgress, [0.1, 0.4 + index * 0.08], [20, 0]);
  const opacity = useTransform(springProgress, [0.1, 0.3 + index * 0.08], [0, 1]);
  const scale = useTransform(springProgress, [0.1, 0.4 + index * 0.08], [0.9, 1]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ y, opacity, rotateX, scale, perspective: 1000 }}
      className="flex-1 w-full"
    >
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -5 }}
        className={`group relative block h-[450px] rounded-[2rem] border overflow-hidden transition-all duration-500 cursor-target
          ${isDark 
            ? 'bg-zinc-900/40 border-white/5 backdrop-blur-2xl' 
            : 'bg-[#e3dbcc]/80 border-stone-300 shadow-xl shadow-stone-400/30 backdrop-blur-md'}`}
      >
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, ${social.color}15, transparent 40%)`
            )
          }}
        />

        <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDark ? 'invert-0' : 'invert'}`}
             style={{ backgroundImage: `radial-gradient(${social.color} 1px, transparent 0)`, backgroundSize: '24px 24px' }} />

        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: social.color }} />
          <span className={`text-[8px] font-mono tracking-[0.2em] uppercase ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            Status: Active // {social.id}
          </span>
        </div>

        <div className="absolute top-6 right-6">
          <ArrowUpRight className={`w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 ${isDark ? 'text-zinc-700' : 'text-stone-400'}`} />
        </div>

        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          <div className="mt-12">
            <div 
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
                ${isDark ? 'bg-zinc-800 text-white shadow-2xl' : 'bg-stone-300 text-zinc-900 shadow-lg'}`}
              style={{ boxShadow: `0 20px 40px -10px ${social.color}20` }}
            >
              {social.icon}
            </div>
            
            <div className="space-y-1">
              <h3 className={`text-3xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {social.name}
              </h3>
              <p className={`text-xs font-mono tracking-widest ${isDark ? 'text-zinc-500' : 'text-stone-700'}`}>
                {social.tag}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`h-[1px] w-full ${isDark ? 'bg-white/5' : 'bg-stone-300'}`} />
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {social.features.map((Icon: any, i: number) => (
                  <Icon key={i} size={14} className={isDark ? 'text-zinc-700' : 'text-stone-500'} />
                ))}
              </div>
              <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${isDark ? 'border-white/5 text-zinc-600' : 'border-stone-400 text-stone-700'}`}>
                LINK_SECURE
              </span>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 h-1 transition-all duration-700 w-0 group-hover:w-full"
          style={{ backgroundColor: social.color, boxShadow: `0 0 20px ${social.color}` }}
        />
      </motion.a>
    </motion.div>
  );
};

const SocialsSection: React.FC<SocialsSectionProps> = ({ theme }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

  const socialLinks = [
    {
      id: 'MOD_01',
      name: 'GitHub',
      icon: <Github size={36} />,
      url: 'https://github.com/Sh4rk-glitch',
      tag: 'SYSTEM.CODE_BASE',
      color: '#3b82f6',
      features: [Cpu, Zap]
    },
    {
      id: 'MOD_02',
      name: 'LinkedIn',
      icon: <Linkedin size={36} />,
      url: 'https://www.linkedin.com/in/shourya-mishra-b87b5036b', 
      tag: 'SYSTEM.NETWORK',
      color: '#0ea5e9',
      features: [Globe, Cpu]
    },
    {
      id: 'MOD_03',
      name: 'Instagram',
      icon: <Instagram size={36} />,
      url: 'https://instagram.com/shourya2009m',
      tag: 'SYSTEM.VISUAL_LOG',
      color: '#ec4899',
      features: [Zap, Globe]
    },
    {
      id: 'MOD_04',
      name: 'Email',
      icon: <Mail size={36} />,
      url: 'mailto:shouryamishra011@gmail.com',
      tag: 'SYSTEM.DIRECT_MSG',
      color: '#f59e0b',
      features: [Cpu, Globe]
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-40 overflow-hidden"
    >
      <motion.div 
        style={{ 
          opacity: useTransform(springProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
          y: useTransform(springProgress, [0, 0.2], [50, 0])
        }}
        className="text-center mb-32 z-10 px-6"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <div className={`h-[1px] w-8 ${isDark ? 'bg-zinc-800' : 'bg-stone-400'}`} />
          <h2 className={`text-xs font-mono uppercase tracking-[0.8em] ${isDark ? 'text-zinc-500' : 'text-stone-600'}`}>
            Click on the cards to visit my socials
          </h2>
          <div className={`h-[1px] w-8 ${isDark ? 'bg-zinc-800' : 'bg-stone-400'}`} />
        </div>
        <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-zinc-950'}`}>
          My Socials<span className="text-blue-500">.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-[1600px] w-full z-10">
        {socialLinks.map((social, index) => (
          <SocialCard 
            key={social.name} 
            social={social} 
            index={index} 
            springProgress={springProgress} 
            theme={theme} 
          />
        ))}
      </div>

      <div className={`absolute bottom-20 left-10 pointer-events-none hidden xl:block font-mono text-[8px] tracking-widest ${isDark ? 'text-zinc-800' : 'text-stone-500'}`}>
        [ COORDINATES: 37.7749° N, 122.4194° W ]<br />
        [ SYSTEM_ENTROPY: 0.00342 ]<br />
        [ ENCRYPTION_STRENGTH: AES-256 ]
      </div>
    </section>
  );
};

export default SocialsSection;
