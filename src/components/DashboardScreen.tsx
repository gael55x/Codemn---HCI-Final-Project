import React from 'react';
import { motion } from 'motion/react';
import { Check, Play, Lock, Flag, ArrowRight, AlertCircle, CheckCircle2, Bot } from 'lucide-react';

import { UserPreferences } from '../types';
import {
  demoUser,
  DiagnosticResult,
  sampleDiagnosticResult,
  TRACKS,
  TRACK_ORDER,
  TrackId,
  buildRoadmap,
} from '../data/demo-data';

interface Props {
  userPreferences: UserPreferences;
  diagnosticResult?: DiagnosticResult;
  currentTrack: TrackId;
  trackProgress: number;
  onSelectTrack: (id: TrackId) => void;
  onOpenModule: (moduleId: string) => void;
  onViewResults?: () => void;
}

export default function DashboardScreen({
  diagnosticResult = sampleDiagnosticResult,
  currentTrack,
  trackProgress,
  onSelectTrack,
  onOpenModule,
  onViewResults,
}: Props) {
  const track = TRACKS[currentTrack];
  const weakSkillIds = diagnosticResult.weakAreas.map((s) => s.id);
  const nodes = buildRoadmap(track, trackProgress, weakSkillIds);
  const done = nodes.filter((n) => n.status === 'completed').length;
  const pct = Math.round((done / nodes.length) * 100);
  const circumference = 2 * Math.PI * 44;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-6xl">
      {/* Greeting + track switcher */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Kumusta, {demoUser.firstName}!</h2>
          <p className="text-base md:text-lg text-on-surface-variant">
            You're <span className="text-primary font-bold">{pct}%</span> through the {track.label} path — keep the streak going.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {TRACK_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => onSelectTrack(id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                currentTrack === id
                  ? 'bg-primary text-surface'
                  : 'glass-card border-outline-variant/10 text-on-surface-variant hover:border-primary/40 hover:text-on-surface'
              }`}
            >
              {TRACKS[id].label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Roadmap */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold">Your roadmap</h3>
              <p className="text-sm text-on-surface-variant">{track.description}</p>
            </div>
            <span className="text-xs font-mono text-on-surface-variant">{done}/{nodes.length} done</span>
          </div>

          <div>
            {nodes.map((node, i) => {
              const isLast = i === nodes.length - 1;
              const clickable = node.status !== 'upcoming';
              const RowTag = clickable ? 'button' : 'div';
              return (
                <RowTag
                  key={node.id}
                  {...(clickable ? { onClick: () => onOpenModule(node.moduleId) } : {})}
                  className={`w-full flex gap-4 md:gap-5 text-left ${clickable ? 'group cursor-pointer' : 'cursor-default'}`}
                >
                  {/* Node + connector */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        node.status === 'completed'
                          ? 'bg-secondary/15 text-secondary border border-secondary/40'
                          : node.status === 'current'
                          ? 'bg-primary text-surface shadow-[0_0_24px_rgba(192,193,255,0.4)] ring-4 ring-primary/20 group-hover:scale-105'
                          : node.isFocus
                          ? 'bg-error/10 text-error border border-error/40'
                          : 'bg-surface-container text-on-surface-variant border border-outline-variant/20'
                      }`}
                    >
                      {node.status === 'completed' ? (
                        <Check size={22} strokeWidth={3} />
                      ) : node.status === 'current' ? (
                        <Play size={20} fill="currentColor" stroke="none" />
                      ) : node.kind === 'checkpoint' ? (
                        <Flag size={20} />
                      ) : (
                        <Lock size={18} />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 flex-1 min-h-[28px] my-1 ${
                          node.status === 'completed' ? 'bg-secondary/40' : 'bg-outline-variant/20'
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 min-w-0 pb-6 ${isLast ? 'pb-0' : ''}`}>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className={`font-bold ${node.status === 'upcoming' ? 'text-on-surface-variant' : ''}`}>{node.title}</h4>
                      {node.kind === 'checkpoint' && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-tertiary/10 text-tertiary">Checkpoint</span>
                      )}
                      {node.isFocus && node.status !== 'completed' && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-error/10 text-error">Review</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {node.status === 'completed' ? 'Completed' : node.status === 'current' ? 'Up next' : 'Locked'}
                    </p>
                    {node.status === 'current' && (
                      <span className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 bg-primary text-surface font-bold rounded-xl text-sm group-hover:brightness-110 transition-all">
                        {done === 0 ? 'Start' : 'Continue'}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </RowTag>
              );
            })}
          </div>
        </div>

        {/* Right rail */}
        <div className="lg:col-span-4 space-y-6">
          {/* Readiness */}
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="relative w-28 h-28 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" strokeWidth="9" fill="none" className="text-surface-container" stroke="currentColor" />
                <motion.circle
                  cx="50" cy="50" r="44" strokeWidth="9" fill="none" strokeLinecap="round"
                  className="text-primary" stroke="currentColor"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - diagnosticResult.score / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{diagnosticResult.score}%</span>
                <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">Readiness</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-5">{diagnosticResult.correctCount}/{diagnosticResult.total} correct on your diagnostic.</p>
            <button
              onClick={onViewResults}
              className="w-full py-2.5 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all text-sm flex items-center justify-center gap-2"
            >
              View full results <ArrowRight size={16} />
            </button>
          </div>

          {/* Focus areas */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-error" size={18} />
              <h4 className="font-bold">Focus areas</h4>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(diagnosticResult.weakAreas.length ? diagnosticResult.weakAreas : diagnosticResult.skills).slice(0, 4).map((s) => (
                <span key={s.id} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-error/10 text-error">{s.label}</span>
              ))}
            </div>
            {diagnosticResult.strengths.length > 0 && (
              <div className="flex items-start gap-2 text-xs text-on-surface-variant pt-4 border-t border-outline-variant/10">
                <CheckCircle2 size={14} className="text-secondary shrink-0 mt-0.5" />
                Strong at {diagnosticResult.strengths.map((s) => s.label).join(', ')}.
              </div>
            )}
          </div>

          {/* Mentor hint */}
          <div className="glass-card rounded-3xl p-6 border border-tertiary/20 bg-gradient-to-br from-tertiary/5 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-tertiary text-surface flex items-center justify-center shrink-0">
                <Bot size={18} fill="currentColor" stroke="none" />
              </div>
              <h4 className="font-bold text-sm">AI mentor</h4>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Stuck on a step? Open the mentor tab and paste your code — I'll explain the <span className="text-tertiary font-bold">why</span>, not just the fix.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
