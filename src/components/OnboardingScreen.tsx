import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Layout, CheckCircle, Lock, ShieldCheck, ArrowRight, Cpu } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<string | null>(null);

  const levels = [
    { id: 'beginner', title: 'Beginner', desc: 'New to logic or starting a first language.', icon: <Terminal className="text-secondary" /> },
    { id: 'intermediate', title: 'Intermediate', desc: 'Comfortable with syntax, learning architecture.', icon: <Cpu className="text-secondary" /> },
    { id: 'advanced', title: 'Advanced', desc: 'Expert in logic, focusing on optimization.', icon: <Layout className="text-secondary" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass-card rounded-[32px] overflow-hidden"
      >
        {/* Progress Header */}
        <div className="px-12 pt-12 pb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-primary tracking-tight">Codemm</span>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Step {step} of 4</span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-secondary to-primary"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="px-12 pb-12">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="mb-10">
              <h2 className="text-4xl font-bold mb-2">Choose your mastery</h2>
              <p className="text-on-surface-variant">We'll tailor your exercises to your starting point.</p>
            </div>

            <div className="space-y-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelection(level.id)}
                  className={`w-full flex items-center p-6 rounded-2xl bg-surface-container border transition-all duration-300 group text-left ${
                    selection === level.id 
                    ? 'border-primary bg-primary/5 active-glow' 
                    : 'border-outline-variant/10 hover:border-primary/50'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                    {level.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`text-xl font-bold mb-1 ${selection === level.id ? 'text-primary' : ''}`}>
                      {level.title}
                    </div>
                    <div className="text-sm text-on-surface-variant leading-snug">{level.desc}</div>
                  </div>
                  {selection === level.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle className="text-primary" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <button 
                onClick={onComplete}
                disabled={!selection}
                className="group px-10 py-5 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-30"
              >
                Continue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="bg-surface-container-low/50 px-12 py-6 flex justify-center items-center gap-8 border-t border-outline-variant/10">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck size={16} className="text-secondary" />
            AI-Optimized Curriculum
          </div>
          <div className="w-1 h-1 rounded-full bg-outline-variant" />
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Lock size={14} className="text-secondary" />
            Secure Sessions
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Custom icons to match prompt
function Cpu(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M9 2v2M15 20v2M9 20v2M20 15h2M20 9h2M2 15h2M2 9h2" />
    </svg>
  );
}
