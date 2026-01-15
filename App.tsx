
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from './components/Hero';
import SocialsSection from './components/SocialsSection';
import Portfolio from './components/Portfolio';
import ContactSection from './components/ContactSection';
import TargetCursor from './components/TargetCursor';
import Particles from './components/Particles';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { scrollYProgress } = useScroll();

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.85, 0.95, 1],
    [
      theme === 'dark' ? '#050505' : '#ffffff', 
      theme === 'dark' ? '#050505' : '#ffffff', 
      theme === 'dark' ? '#0a0a0b' : '#f8fafc', 
      theme === 'dark' ? '#0a0a0a' : '#edf2f7', 
      theme === 'dark' ? '#000000' : '#ffffff', 
      theme === 'dark' ? '#000000' : '#ffffff'  
    ]
  );

  const footerLinks = [
    { label: 'GitHub', url: 'https://github.com/Sh4rk-glitch' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shourya-mishra-b87b5036b' },
    { label: 'Instagram', url: 'https://www.instagram.com/shourya2009m' },
  ];

  const isDark = theme === 'dark';

  return (
    <motion.main 
      style={{ backgroundColor }}
      className="min-h-screen transition-colors duration-1000 ease-in-out relative overflow-x-hidden"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles 
          particleCount={300}
          particleSpread={15}
          particleColors={isDark ? ['#ffffff', '#3b82f6', '#60a5fa'] : ['#000000', '#2563eb', '#1e40af']}
          particleBaseSize={100}
          speed={0.15}
          moveParticlesOnHover={true}
          particleHoverFactor={1.8}
          alphaParticles={true}
          disableRotation={false}
          sizeRandomness={1.8}
          className="opacity-40"
        />
      </div>

      <TargetCursor 
        spinDuration={2.5}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      <div className="relative z-10">
        <Hero theme={theme} />
        
        <SocialsSection theme={theme} />

        <Portfolio theme={theme} />

        <ContactSection theme={theme} />

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className={`py-24 px-8 border-t flex flex-col md:flex-row justify-between items-center gap-12 transition-colors duration-700 bg-transparent ${isDark ? 'border-zinc-900' : 'border-zinc-200'}`}
        >
          <div className={`font-mono text-[9px] tracking-[0.6em] uppercase transition-colors duration-700 text-center md:text-left ${isDark ? 'text-zinc-800' : 'text-zinc-500'}`}>
            Built by Shourya Mishra // 2026
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 md:gap-x-12 gap-y-6">
            {footerLinks.map(link => (
              <a 
                key={link.label}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`cursor-target group relative block overflow-hidden px-1 py-1 transition-colors duration-500 ${isDark ? 'text-zinc-700 hover:text-white' : 'text-zinc-400 hover:text-zinc-950'}`}
              >
                <div className="relative h-[1.2em] overflow-hidden flex flex-col items-center md:items-start uppercase text-[10px] font-mono tracking-[0.4em]">
                  <span className="block transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="block absolute top-0 left-0 transition-transform duration-500 ease-in-out translate-y-full group-hover:translate-y-0 text-blue-500 font-bold">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.footer>
      </div>

      <div className="fixed top-8 right-8 z-[500] pointer-events-auto">
        <button 
          onClick={toggleTheme} 
          className={`cursor-target p-5 rounded-full border shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${isDark ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/10 text-black'}`}
        >
          {isDark ? <span className="text-xl">☀️</span> : <span className="text-xl">🌙</span>}
        </button>
      </div>
    </motion.main>
  );
};

export default App;
