import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Layout, 
  CheckCircle, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Cpu,
  Code2,
  Target,
  Clock,
  Zap
} from 'lucide-react';

import { UserPreferences } from '../types';

interface Props {
  onComplete: (selections: UserPreferences) => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    level: null as string | null,
    path: null as string | null,
    goal: null as string | null,
    time: null as string | null
  });

  const steps = [
    {
      title: 'What do you want to build?',
      subtitle: 'This sets your learning path — you can switch anytime.',
      options: [
        { id: 'frontend', title: 'Frontend', desc: 'JavaScript, React, and modern UI.', icon: <Code2 className="text-primary" /> },
        { id: 'backend', title: 'Backend', desc: 'Node.js, databases, and API design.', icon: <Terminal className="text-primary" /> },
        { id: 'fullstack', title: 'Full-Stack', desc: 'End-to-end web development.', icon: <Layout className="text-primary" /> },
      ],
      key: 'path' as const
    },
    {
      title: 'How much have you coded before?',
      subtitle: "We'll calibrate your starting point.",
      options: [
        { id: 'beginner', title: 'Beginner', desc: 'New to logic or a first language.', icon: <Terminal className="text-secondary" /> },
        { id: 'intermediate', title: 'Intermediate', desc: 'Comfortable with syntax, learning deeper.', icon: <Cpu className="text-secondary" /> },
        { id: 'advanced', title: 'Advanced', desc: 'Solid on logic, focusing on mastery.', icon: <Layout className="text-secondary" /> },
      ],
      key: 'level' as const
    }
  ];

  const currentStep = steps[step - 1];
  const currentSelection = selections[currentStep.key];

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      onComplete(selections);
    }
  };

  const handleSelect = (id: string) => {
    setSelections({ ...selections, [currentStep.key]: id });
  };

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
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Step {step} of {steps.length}</span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-secondary to-primary"
              animate={{ width: `${(step / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="px-12 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h2 className="text-4xl font-bold mb-2">{currentStep.title}</h2>
                <p className="text-on-surface-variant">{currentStep.subtitle}</p>
              </div>

              <div className="space-y-4">
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full flex items-center p-6 rounded-2xl bg-surface-container border transition-all duration-300 group text-left ${
                      currentSelection === option.id 
                      ? 'border-primary bg-primary/5 active-glow' 
                      : 'border-outline-variant/10 hover:border-primary/50'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-surface-container-highest flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-xl font-bold mb-1 ${currentSelection === option.id ? 'text-primary' : ''}`}>
                        {option.title}
                      </div>
                      <div className="text-sm text-on-surface-variant leading-snug">{option.desc}</div>
                    </div>
                    {currentSelection === option.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle className="text-primary" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-end">
                <button 
                  onClick={handleNext}
                  disabled={!currentSelection}
                  className="group px-10 py-5 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {step === steps.length ? 'Start diagnostic' : 'Continue'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
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
