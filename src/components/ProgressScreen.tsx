import React from 'react';
import { motion } from 'motion/react';
import { Map, Target, Brain, TrendingUp } from 'lucide-react';
import { DiagnosticResult, sampleDiagnosticResult, TRACKS, TrackId } from '../data/demo-data';

interface Props {
  diagnosticResult?: DiagnosticResult;
  currentTrack?: TrackId;
  trackProgress?: number;
}

const statusStyles: Record<string, { bar: string; text: string }> = {
  strong: { bar: 'bg-secondary', text: 'text-secondary' },
  developing: { bar: 'bg-primary', text: 'text-primary' },
  weak: { bar: 'bg-error/70', text: 'text-error' },
};

export default function ProgressScreen({
  diagnosticResult = sampleDiagnosticResult,
  currentTrack = 'fullstack',
  trackProgress = 0,
}: Props) {
  const track = TRACKS[currentTrack];
  const totalSteps = track.steps.length;
  const done = Math.min(trackProgress, totalSteps);
  const roadmapPct = Math.round((done / totalSteps) * 100);
  const circumference = 2 * Math.PI * 80;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Skill progression</h2>
        <p className="text-lg text-on-surface-variant">Based on your diagnostic and your {track.label} roadmap.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-8 border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Roadmap</span>
            <Map size={24} className="text-secondary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">{done}/{totalSteps}</h3>
          <p className="text-sm text-secondary font-bold mb-4">{roadmapPct}% complete</p>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: `${roadmapPct}%` }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Readiness</span>
            <Target size={24} className="text-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">{diagnosticResult.score}%</h3>
          <p className="text-sm text-primary font-bold mb-4">{diagnosticResult.correctCount}/{diagnosticResult.total} on diagnostic</p>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${diagnosticResult.score}%` }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 border-tertiary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Strengths</span>
            <TrendingUp size={24} className="text-tertiary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">{diagnosticResult.strengths.length}</h3>
          <p className="text-sm text-tertiary font-bold">{diagnosticResult.weakAreas.length} focus area{diagnosticResult.weakAreas.length === 1 ? '' : 's'} left</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skill mastery (synced with diagnostic) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Brain size={22} className="text-primary" />
            <h3 className="text-2xl font-bold">Skill mastery</h3>
          </div>
          <div className="space-y-5">
            {diagnosticResult.skills.map((skill) => {
              const s = statusStyles[skill.status];
              return (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{skill.label}</span>
                    <span className={`text-xs font-bold ${s.text}`}>{skill.score}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${s.bar}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Readiness ring + recommended */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                <circle cx="96" cy="96" r="80" strokeWidth="8" fill="none" className="text-surface-container" stroke="currentColor" />
                <motion.circle
                  cx="96" cy="96" r="80" strokeWidth="8" fill="none" strokeLinecap="round"
                  className="text-primary" stroke="currentColor"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - diagnosticResult.score / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain size={40} className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-on-surface-variant">
              {diagnosticResult.weakAreas[0]
                ? <>Your focus is highest in <span className="text-secondary font-bold">{diagnosticResult.strengths[0]?.label ?? 'the basics'}</span>, with room to grow in <span className="text-error font-bold">{diagnosticResult.weakAreas[0].label}</span>.</>
                : <>You're strong across the board — keep reinforcing to stay sharp.</>}
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6">Recommended next</h3>
            <div className="space-y-3">
              {diagnosticResult.recommendedPath.slice(0, 3).map((mod, i) => (
                <div key={`${mod.moduleId}-${i}`} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h4 className="font-bold text-sm">{mod.title}</h4>
                    <span className="text-[10px] font-mono text-on-surface-variant shrink-0">{mod.minutes}m</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{mod.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
