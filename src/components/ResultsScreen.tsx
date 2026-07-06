import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, RotateCcw, TrendingUp, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { DiagnosticResult } from '../data/demo-data';

interface Props {
  result: DiagnosticResult;
  onStartPath: () => void;
  onOpenModule?: (moduleId: string) => void;
  onRetake: () => void;
}

const statusStyles: Record<string, { bar: string; text: string; chip: string }> = {
  strong: { bar: 'bg-secondary', text: 'text-secondary', chip: 'bg-secondary/10 text-secondary' },
  developing: { bar: 'bg-primary', text: 'text-primary', chip: 'bg-primary/10 text-primary' },
  weak: { bar: 'bg-error/70', text: 'text-error', chip: 'bg-error/10 text-error' },
};

const priorityChip: Record<string, string> = {
  High: 'bg-error/10 text-error',
  Medium: 'bg-primary/10 text-primary',
  Foundational: 'bg-secondary/10 text-secondary',
};

export default function ResultsScreen({ result, onStartPath, onOpenModule, onRetake }: Props) {
  const circumference = 2 * Math.PI * 52;

  return (
    <div className="min-h-screen gradient-mesh overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-8 py-16 space-y-10"
      >
        {/* Header + score */}
        <div className="flex flex-col md:flex-row items-center gap-10 glass-card rounded-[32px] p-10">
          <div className="relative w-40 h-40 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" strokeWidth="10" fill="none" className="text-surface-container" stroke="currentColor" />
              <motion.circle
                cx="60" cy="60" r="52" strokeWidth="10" fill="none" strokeLinecap="round"
                className="text-primary" stroke="currentColor"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: circumference * (1 - result.score / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{result.score}%</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Readiness</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
              Diagnostic complete
            </span>
            <h1 className="text-4xl font-bold tracking-tight mb-3">{result.headline}</h1>
            <p className="text-lg text-on-surface-variant max-w-xl">{result.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill breakdown */}
          <div className="glass-card rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-primary" size={22} />
              <h3 className="text-2xl font-bold">Skill breakdown</h3>
            </div>
            <div className="space-y-5">
              {result.skills.map((skill, i) => {
                const s = statusStyles[skill.status];
                return (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold">{skill.label}</span>
                      <span className={`text-xs font-bold ${s.text}`}>{skill.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${s.bar}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * i }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths + weak areas */}
          <div className="space-y-8">
            <div className="glass-card rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="text-secondary" size={22} />
                <h3 className="text-xl font-bold">Strengths</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.strengths.length > 0 ? (
                  result.strengths.map((s) => (
                    <span key={s.id} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${statusStyles.strong.chip}`}>
                      {s.label}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-on-surface-variant">We'll surface these as you practice — your path builds them fast.</p>
                )}
              </div>
            </div>

            <div className="glass-card rounded-[32px] p-8">
              <div className="flex items-center gap-3 mb-5">
                <AlertCircle className="text-error" size={22} />
                <h3 className="text-xl font-bold">Focus areas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.weakAreas.length > 0 ? (
                  result.weakAreas.map((s) => (
                    <span key={s.id} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${statusStyles[s.status].chip}`}>
                      {s.label}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-on-surface-variant">No major gaps — nice. Your path keeps you sharp.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended path */}
        <div className="glass-card rounded-[32px] p-8">
          <div className="flex items-center gap-3 mb-8">
            <Target className="text-tertiary" size={22} />
            <h3 className="text-2xl font-bold">Your recommended path</h3>
          </div>
          <div className="space-y-4">
            {result.recommendedPath.map((mod, i) => (
              <motion.button
                key={`${mod.moduleId}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => onOpenModule?.(mod.moduleId)}
                className="w-full text-left flex items-center gap-5 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-bold text-primary shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h4 className="font-bold">{mod.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priorityChip[mod.priority]}`}>
                      {mod.priority}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">{mod.reason}</p>
                </div>
                <span className="text-xs font-mono text-on-surface-variant shrink-0">{mod.minutes}m</span>
                <ArrowRight size={16} className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Next actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <button
            onClick={onStartPath}
            className="group px-10 py-5 bg-primary text-surface font-bold text-lg rounded-2xl hover:brightness-110 hover:shadow-[0_0_30px_rgba(192,193,255,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Start my path
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onRetake}
            className="px-8 py-5 border border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Retake diagnostic
          </button>
        </div>
      </motion.div>
    </div>
  );
}
