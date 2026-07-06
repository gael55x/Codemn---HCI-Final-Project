import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Star, Lock, Trophy, ArrowRight, AlertCircle, CheckCircle2, Bot } from 'lucide-react';

import { UserPreferences } from '../types';
import {
  demoUser,
  DiagnosticResult,
  sampleDiagnosticResult,
  TRACKS,
  TRACK_ORDER,
  TrackId,
  buildRoadmap,
  RoadmapNode,
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

/* --------------------------- Winding roadmap path -------------------------- */

const R = 32; // node radius
const V_GAP = 112; // vertical spacing between node centers
const TOP_PAD = 68;
const BOT_PAD = 76;
const WAVE = [0, 0.7, 1, 0.7, 0, -0.7, -1, -0.7]; // normalized serpentine

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function Roadmap({ nodes, onOpenModule }: { nodes: RoadmapNode[]; onOpenModule: (id: string) => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const amplitude = Math.max(40, Math.min(width * 0.33, 140));
  const center = width / 2;
  const points = nodes.map((_, i) => ({
    x: center + amplitude * WAVE[i % WAVE.length],
    y: TOP_PAD + i * V_GAP,
  }));
  const totalHeight = TOP_PAD + (nodes.length - 1) * V_GAP + BOT_PAD;

  const currentIndex = nodes.findIndex((n) => n.status === 'current');
  const coloredCount = currentIndex === -1 ? nodes.length : currentIndex + 1;

  const trackD = smoothPath(points);
  const doneD = smoothPath(points.slice(0, Math.max(coloredCount, 1)));

  const shadowFor: Record<string, string> = {
    completed: 'var(--color-secondary-container)',
    current: 'var(--color-primary-container)',
    upcoming: 'var(--color-outline-variant)',
  };

  return (
    <div ref={wrapRef} className="relative w-full max-w-[440px] mx-auto" style={{ height: totalHeight }}>
      {/* Path */}
      <svg width={width} height={totalHeight} className="absolute inset-0 pointer-events-none" aria-hidden>
        <path d={trackD} fill="none" stroke="var(--color-surface-container-highest)" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
        {coloredCount > 1 && (
          <path d={doneD} fill="none" stroke="var(--color-secondary)" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const p = points[i];
        const clickable = node.status !== 'upcoming';
        const isCheckpoint = node.kind === 'checkpoint';
        const showFocus = node.isFocus && node.status !== 'completed';

        const bg =
          node.status === 'completed'
            ? 'bg-secondary text-surface'
            : node.status === 'current'
            ? 'bg-primary text-surface'
            : isCheckpoint
            ? 'bg-surface-container-highest text-tertiary'
            : 'bg-surface-container-highest text-on-surface-variant';

        const Icon =
          node.status === 'completed'
            ? isCheckpoint
              ? Trophy
              : Check
            : node.status === 'current'
            ? isCheckpoint
              ? Trophy
              : Star
            : isCheckpoint
            ? Trophy
            : Lock;

        const labelColor =
          node.status === 'current'
            ? 'text-primary'
            : showFocus
            ? 'text-error'
            : node.status === 'upcoming'
            ? 'text-on-surface-variant'
            : 'text-on-surface';

        return (
          <div key={node.id}>
            {/* Current-node bubble */}
            {node.status === 'current' && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute z-20 pointer-events-none"
                style={{ left: p.x, top: p.y - R - 42, transform: 'translateX(-50%)' }}
              >
                <div className="relative px-3 py-1 rounded-lg bg-primary text-surface text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow-lg">
                  {currentIndex === 0 ? 'Start' : 'Continue'}
                  <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-primary rotate-45 -translate-x-1/2" />
                </div>
              </motion.div>
            )}

            {/* Node */}
            {React.createElement(
              clickable ? 'button' : 'div',
              {
                ...(clickable ? { onClick: () => onOpenModule(node.moduleId) } : {}),
                className: `absolute z-10 rounded-full flex items-center justify-center transition-transform ${bg} ${
                  clickable ? 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0' : 'cursor-default'
                } ${showFocus ? 'ring-4 ring-error/40' : ''}`,
                style: {
                  left: p.x,
                  top: p.y,
                  width: R * 2,
                  height: R * 2,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 6px 0 0 ${shadowFor[node.status] ?? 'var(--color-outline-variant)'}`,
                },
              },
              <>
                {node.status === 'current' && (
                  <span className="absolute inset-0 rounded-full ring-4 ring-primary/40 animate-ping opacity-40" />
                )}
                <Icon size={26} strokeWidth={node.status === 'completed' ? 3 : 2.4} fill={node.status === 'current' && !isCheckpoint ? 'currentColor' : 'none'} />
                {showFocus && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error text-surface text-[10px] font-bold flex items-center justify-center">!</span>
                )}
              </>
            )}

            {/* Label */}
            <div
              className={`absolute z-10 text-center text-[11px] font-bold leading-tight pointer-events-none ${labelColor}`}
              style={{ left: p.x, top: p.y + R + 8, width: 128, transform: 'translateX(-50%)' }}
            >
              {node.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- Screen ---------------------------------- */

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Roadmap */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-4 md:p-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <h3 className="text-2xl font-bold">Your roadmap</h3>
              <p className="text-sm text-on-surface-variant">{track.description}</p>
            </div>
            <span className="text-xs font-mono text-on-surface-variant">{done}/{nodes.length} done</span>
          </div>
          <Roadmap nodes={nodes} onOpenModule={onOpenModule} />
        </div>

        {/* Right rail */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
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
            <span className={`px-3 py-1 mb-3 rounded-full text-[11px] font-bold ${
              diagnosticResult.readiness.tone === 'strong' ? 'bg-secondary/10 text-secondary'
              : diagnosticResult.readiness.tone === 'developing' ? 'bg-primary/10 text-primary'
              : 'bg-error/10 text-error'
            }`}>
              {diagnosticResult.readiness.label}
            </span>
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
