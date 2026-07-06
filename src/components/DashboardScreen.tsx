import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Target,
  Compass,
  Bot,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

import { UserPreferences } from '../types';
import { demoUser, DiagnosticResult, sampleDiagnosticResult } from '../data/demo-data';

interface Props {
  userPreferences: UserPreferences;
  diagnosticResult?: DiagnosticResult;
  onResumeLesson?: () => void;
  onViewSyllabus?: () => void;
  onViewResults?: () => void;
}

const statusStyles: Record<string, { bar: string; text: string }> = {
  strong: { bar: 'bg-secondary', text: 'text-secondary' },
  developing: { bar: 'bg-primary', text: 'text-primary' },
  weak: { bar: 'bg-error/70', text: 'text-error' },
};

export default function DashboardScreen({
  userPreferences,
  diagnosticResult = sampleDiagnosticResult,
  onResumeLesson,
  onViewSyllabus,
  onViewResults,
}: Props) {
  const focusAreas = diagnosticResult.weakAreas.length > 0 ? diagnosticResult.weakAreas : diagnosticResult.skills;
  const topFocus = focusAreas[0]?.label;
  const circumference = 2 * Math.PI * 52;

  // Continue-learning module reflects the onboarding path choice.
  const moduleInfo = (() => {
    switch (userPreferences.path) {
      case 'backend':
        return { title: 'System Design & Node.js', focus: 'Express and REST API architecture', width: '30%', progress: '30%' };
      case 'frontend':
        return { title: 'Modern React Patterns', focus: 'Hooks and state management', width: '20%', progress: '20%' };
      default:
        return { title: 'JavaScript Fundamentals', focus: 'Arrays, loops, and core logic', width: '50%', progress: '50%' };
    }
  })();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl">
      <section>
        <h2 className="text-4xl font-bold tracking-tight mb-2">Kumusta, {demoUser.firstName}!</h2>
        <p className="text-lg text-on-surface-variant">
          {topFocus
            ? <>Your diagnostic points to <span className="text-primary font-bold">{topFocus}</span> — let's close that gap next.</>
            : <>You're on track. Pick up where you left off below.</>}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue learning */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-primary/5 rounded-full -mr-32 -mt-32 blur-[100px] group-hover:bg-primary/10 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Continue learning</span>
              <span className="font-mono text-xs text-on-surface-variant">{moduleInfo.progress} complete</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{moduleInfo.title}</h3>
            <p className="text-lg text-on-surface-variant mb-6">{moduleInfo.focus}</p>
            <div className="w-full bg-surface-container h-1.5 rounded-full mb-8 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: moduleInfo.width }} className="h-full bg-gradient-to-r from-secondary to-primary" />
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <button
              onClick={onResumeLesson}
              className="px-8 py-4 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 hover:shadow-lg transition-all active:scale-95"
            >
              Resume lesson
            </button>
            <button
              onClick={onViewSyllabus}
              className="px-8 py-4 border border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-highest transition-all"
            >
              View syllabus
            </button>
          </div>
        </div>

        {/* Readiness */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-5">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" strokeWidth="10" fill="none" className="text-surface-container" stroke="currentColor" />
              <motion.circle
                cx="60" cy="60" r="52" strokeWidth="10" fill="none" strokeLinecap="round"
                className="text-primary" stroke="currentColor"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - diagnosticResult.score / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{diagnosticResult.score}%</span>
              <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">Readiness</span>
            </div>
          </div>
          <h4 className="text-lg font-bold mb-1">{diagnosticResult.headline}</h4>
          <p className="text-sm text-on-surface-variant mb-6">{diagnosticResult.correctCount}/{diagnosticResult.total} correct on your diagnostic.</p>
          <button
            onClick={onViewResults}
            className="mt-auto w-full py-3 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all text-sm flex items-center justify-center gap-2"
          >
            View full results
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Focus areas */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-error" size={22} />
            <h4 className="text-xl font-bold">Your focus areas</h4>
          </div>
          <div className="space-y-5">
            {focusAreas.slice(0, 3).map((skill) => {
              const s = statusStyles[skill.status];
              return (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{skill.label}</span>
                    <span className={`text-xs font-bold ${s.text}`}>{skill.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${s.bar}`} style={{ width: `${skill.score}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {diagnosticResult.strengths.length > 0 && (
            <div className="mt-6 pt-5 border-t border-outline-variant/10 flex items-center gap-2 text-sm text-on-surface-variant">
              <CheckCircle2 size={16} className="text-secondary shrink-0" />
              Strong at {diagnosticResult.strengths.map((s) => s.label).join(', ')}.
            </div>
          )}
        </div>

        {/* Recommended next */}
        <div className="lg:col-span-6 glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Compass className="text-primary" size={22} />
            <h4 className="text-xl font-bold">Recommended next</h4>
          </div>
          <div className="space-y-3">
            {diagnosticResult.recommendedPath.slice(0, 3).map((mod, i) => (
              <button
                key={`${mod.moduleId}-${i}`}
                onClick={onResumeLesson}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center font-bold text-primary shrink-0">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{mod.title}</p>
                  <p className="text-xs text-on-surface-variant truncate">{mod.reason}</p>
                </div>
                <ArrowRight size={16} className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Mentor tip */}
        <div className="lg:col-span-12 glass-card rounded-3xl p-8 border border-tertiary/20 bg-gradient-to-br from-tertiary/5 to-transparent relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 opacity-10">
            <Bot size={200} />
          </div>
          <div className="relative z-10 flex items-start gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-xl bg-tertiary text-surface flex items-center justify-center shrink-0">
              <Bot size={22} fill="currentColor" stroke="none" />
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest mb-2">AI mentor</p>
              <p className="text-lg leading-relaxed">
                {topFocus
                  ? <>Let's turn <span className="text-tertiary font-bold">{topFocus}</span> from a weak spot into a strength. Open the mentor anytime with the <Target size={16} className="inline -mt-1 text-tertiary" /> tab and paste code you're stuck on — I'll explain the why.</>
                  : <>Nice work. Keep the momentum — open the mentor anytime to pressure-test your understanding on any topic.</>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
