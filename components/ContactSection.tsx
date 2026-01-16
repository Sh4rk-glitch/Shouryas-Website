
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Send, Cpu, ShieldCheck, Zap, CheckCircle2, Terminal, RefreshCcw, AlertTriangle } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface ContactSectionProps {
  theme: 'light' | 'dark';
}

const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');
  const [logIndex, setLogIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const logs = [
    "INITIALIZING_UPLINK...",
    "ENCRYPTING_DATA_PACKETS...",
    "BYPASSING_NEURAL_FIREWALL...",
    "ESTABLISHING_HANDSHAKE...",
    "TRANSMITTING_MESSAGE..."
  ];

  useEffect(() => {
    let interval: any;
    if (status === 'transmitting') {
      interval = setInterval(() => {
        setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
      }, 400);
    } else {
      setLogIndex(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.95, 1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('transmitting');

    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('message', formData.message);

      const response = await fetch("https://formkeep.com/f/5d90e0c8f889", {
        method: "POST",
        body: body,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
      } else {
        throw new Error("Transmission Failed");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
  };

  const inputClasses = `cursor-target w-full bg-transparent border-b outline-none py-4 px-2 font-mono text-sm transition-all duration-300 focus:border-blue-500 ${
    isDark ? 'border-zinc-800 text-white placeholder-zinc-700' : 'border-zinc-200 text-zinc-900 placeholder-zinc-400'
  }`;

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col items-center justify-center py-40 overflow-hidden px-6">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-4xl w-full z-10"
      >
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`h-[1px] w-8 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
            <h2 className={`text-[10px] font-mono uppercase tracking-[0.8em] ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Communication Uplink
            </h2>
            <div className={`h-[1px] w-8 ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
          </div>
          <h2 className={`text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
            Let's Connect<span className="text-blue-500">.</span>
          </h2>
          <p className={`font-mono text-xs uppercase tracking-widest max-w-lg mx-auto leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Ready to initiate technical collaboration. Secure channel status: [STABLE]
          </p>
        </div>

        <ElectricBorder
          color={isDark ? "#3b82f6" : "#2563eb"}
          speed={0.5}
          chaos={0.05}
          borderRadius={32}
          className="w-full"
        >
          <div className={`relative min-h-[500px] p-8 md:p-16 rounded-[32px] overflow-hidden backdrop-blur-xl border flex flex-col justify-center ${
            isDark ? 'bg-zinc-950/50 border-white/5' : 'bg-white/80 border-zinc-200'
          }`}>
            <AnimatePresence mode="wait">
              {(status === 'idle' || status === 'error') && (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit} 
                  className="space-y-12"
                >
                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[10px] uppercase tracking-wider">
                      <AlertTriangle size={14} />
                      Uplink Interrupted. Please retry transmission.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-2">
                      <label className={`cursor-target inline-block text-[9px] font-mono uppercase tracking-[0.3em] ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Sender_Identity</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Enter Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={inputClasses}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`cursor-target inline-block text-[9px] font-mono uppercase tracking-[0.3em] ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Callback_Email</label>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="name@domain.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`cursor-target inline-block text-[9px] font-mono uppercase tracking-[0.3em] ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>Message_Packet</label>
                    <textarea 
                      name="message"
                      placeholder="Describe your project or inquiry..."
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
                    <div className="flex gap-6 items-center">
                      {[Cpu, ShieldCheck, Zap].map((Icon, i) => (
                        <div key={i} className={`flex items-center gap-2 ${isDark ? 'text-zinc-800' : 'text-zinc-300'}`}>
                          <Icon size={14} />
                          <span className="text-[8px] font-mono tracking-tighter uppercase">Protocol_V.{i+1}</span>
                        </div>
                      ))}
                    </div>

                    <button 
                      type="submit"
                      className={`cursor-target group relative px-12 py-5 rounded-full font-mono text-[11px] uppercase tracking-[0.4em] transition-all duration-500 overflow-hidden bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95`}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Initiate Transmission
                        <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </button>
                  </div>
                </motion.form>
              )}

              {status === 'transmitting' && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-8 py-20"
                >
                  <div className="relative">
                    <div className="w-24 h-24 border-2 border-blue-500/20 rounded-full" />
                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-blue-500 rounded-full animate-spin" />
                    <Cpu className="absolute inset-0 m-auto text-blue-500 animate-pulse" size={32} />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2 font-mono text-blue-500 text-xs h-6">
                      <Terminal size={14} />
                      <span className="tracking-[0.2em]">{logs[logIndex]}</span>
                    </div>
                    <div className={`font-mono text-[8px] tracking-[0.3em] uppercase ${isDark ? 'text-zinc-700' : 'text-zinc-400'}`}>
                      Uplink secure // routing via encrypted nodes
                    </div>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-8 py-10"
                >
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 size={48} className="animate-bounce" />
                  </div>
                  <div className="space-y-4">
                    <h3 className={`text-4xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                      Transmission Verified
                    </h3>
                    <p className={`font-mono text-xs uppercase tracking-widest max-w-sm mx-auto leading-relaxed ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      Message packet received successfully. Shourya will process the inquiry shortly.
                    </p>
                  </div>
                  
                  <div className={`mt-10 p-4 rounded-xl border font-mono text-[9px] tracking-widest uppercase ${isDark ? 'bg-white/5 border-white/10 text-zinc-500' : 'bg-zinc-50 border-zinc-100 text-zinc-400'}`}>
                    Ref_ID: {Math.random().toString(36).substring(7).toUpperCase()}-{Date.now()}
                  </div>

                  <button 
                    onClick={handleReset}
                    className={`cursor-target mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${isDark ? 'text-zinc-600 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
                  >
                    <RefreshCcw size={12} />
                    Reset Channel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ElectricBorder>
      </motion.div>

      {/* Decorative Technical Overlay */}
      <div className={`absolute bottom-10 right-10 pointer-events-none font-mono text-[8px] tracking-widest text-right ${isDark ? 'text-zinc-800' : 'text-zinc-300'}`}>
        AUTO_ENCRYPTION: ACTIVE<br />
        PACKET_LOSS: 0.00%<br />
        SIGNAL_STRENGTH: NOMINAL
      </div>
    </section>
  );
};

export default ContactSection;
