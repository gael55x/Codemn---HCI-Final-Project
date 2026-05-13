import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Zap, Activity, Clock, ArrowRight, Github } from 'lucide-react';
import { ScreenType } from '../types';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  const features = [
    {
      icon: <Terminal size={32} className="text-secondary" />,
      title: "Interactive Sandbox",
      description: "Write, test, and debug code in a technical environment built for focus."
    },
    {
      icon: <Zap size={32} className="text-tertiary" />,
      title: "AI Mentor",
      description: "Get context-aware hints and code reviews that actually explain the 'why'."
    },
    {
      icon: <Activity size={32} className="text-primary" />,
      title: "Personalized Path",
      description: "A dynamic roadmap that adapts based on your real-world performance."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 pt-32 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-surface-container border border-outline-variant/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">Now open for Filipino learners</span>
        </div>

        <h1 className="text-[72px] font-bold leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto">
          Master Coding with your <span className="text-primary italic">AI Sensei</span>
        </h1>
        
        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
          Personalized lessons, interactive coding activities, and instant AI feedback designed for the next generation of Filipino tech talent.
        </p>

        <div className="flex items-center justify-center gap-6 mb-24">
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-primary text-surface font-bold text-lg rounded-2xl hover:brightness-110 hover:shadow-[0_0_30px_rgba(192,193,255,0.3)] transition-all active:scale-95"
          >
            Start Learning
          </button>
        </div>
      </motion.div>

      {/* Tool Preview Mockup */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden glass-card p-6 ai-glow mb-32"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex items-end p-12">
          <div className="flex items-center gap-2 text-secondary font-mono text-sm">
            <span className="w-3 h-3 rounded-full bg-secondary animate-bounce" />
            Active Learning Session: JavaScript Fundamentals
          </div>
        </div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBplpVFjDc58-GFW_SyMywdyazaTaoM6MZSdWwku1im7hqvWYFcm55egaLyP4HHb5VvyV4Qk2wqboBHJyfaMjGC9JLWy13XH3WowCkht8Q388igJNvrCXp6wYxfrwllJT-TCmcKkvfXGy0nY4hUTvVZESuxFUMuOi3uFLZ4saXfeDdAmD6RyUe7j9jlethWsr1eury5mdanIfhW3m2wd-el2I_zWnkFQwLt1eb5ecBthwLIhDOnsiUr6vt5mHD1-I3wcT3FcYs2Fg" 
          alt="Dashboard Preview"
          className="w-full h-full object-cover rounded-2xl opacity-80"
        />
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="p-8 glass-card rounded-3xl hover:border-primary/30 transition-all cursor-default"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <footer className="pt-24 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
        <div className="flex items-center gap-3">
          <Terminal className="text-primary" />
          <span className="font-bold text-xl">Codemm</span>
        </div>
        <p className="text-sm">© 2024 Codemm. Proudly built in the Philippines.</p>
        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-primary">Curriculum</a>
          <a href="#" className="hover:text-primary">Pricing</a>
          <a href="#" className="hover:text-primary">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
