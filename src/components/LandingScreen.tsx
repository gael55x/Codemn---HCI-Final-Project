import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Compass, MessageSquareCode, Gauge, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  const features = [
    {
      icon: <Gauge size={32} className="text-secondary" />,
      title: 'Skill diagnostic',
      description: 'A 60-second check that pinpoints exactly which topics are holding you back.'
    },
    {
      icon: <Compass size={32} className="text-primary" />,
      title: 'Personalized path',
      description: 'One clear sequence of lessons and coding drills, ordered around your weak spots.'
    },
    {
      icon: <MessageSquareCode size={32} className="text-tertiary" />,
      title: 'Mentor that explains why',
      description: "Context-aware hints and reviews that teach the reasoning, not just the fix."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 pt-28 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full bg-surface-container border border-outline-variant/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">Built for Filipino developers</span>
        </div>

        <h1 className="text-[64px] md:text-[72px] font-bold leading-[0.95] tracking-tighter mb-8 max-w-4xl mx-auto">
          Find your coding gaps. <br />
          Follow <span className="text-primary italic">one clear path.</span>
        </h1>

        <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
          Most learners jump between tutorials and AI answers and still feel lost. Codemm starts with a quick diagnostic, then builds a personalized path with hands-on practice and a mentor that explains the <span className="text-on-surface font-medium">why</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onStart}
            className="group px-10 py-5 bg-primary text-surface font-bold text-lg rounded-2xl hover:brightness-110 hover:shadow-[0_0_30px_rgba(192,193,255,0.3)] transition-all active:scale-95 flex items-center gap-3"
          >
            Start free diagnostic
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-sm text-on-surface-variant">No sign-up. Takes about a minute.</span>
        </div>
      </motion.div>

      {/* On-brand mock of the diagnostic result (no external assets) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative max-w-4xl mx-auto rounded-3xl glass-card active-glow p-8 md:p-10 mb-32 text-left"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-surface font-bold">C</div>
            <div>
              <p className="text-sm font-bold">Your diagnostic result</p>
              <p className="text-[11px] text-on-surface-variant uppercase tracking-widest font-semibold">Sample preview</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary leading-none">60%</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Readiness</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {[
              { label: 'Arrays & Loops', pct: 92, color: 'bg-secondary', text: 'text-secondary' },
              { label: 'Logic Formulation', pct: 88, color: 'bg-secondary', text: 'text-secondary' },
              { label: 'Functions & Scope', pct: 45, color: 'bg-error/70', text: 'text-error' },
              { label: 'Algorithms', pct: 30, color: 'bg-error/70', text: 'text-error' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold">{s.label}</span>
                  <span className={`text-xs font-bold ${s.text}`}>{s.pct}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-secondary/20 flex items-center gap-3">
              <CheckCircle2 size={18} className="text-secondary shrink-0" />
              <span className="text-sm">Strong at <span className="font-bold">Arrays</span> &amp; <span className="font-bold">Logic</span></span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low border border-error/20 flex items-center gap-3">
              <AlertCircle size={18} className="text-error shrink-0" />
              <span className="text-sm">Start with <span className="font-bold">Functions</span> &amp; <span className="font-bold">Algorithms</span></span>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Next up</p>
              <p className="text-sm font-bold">Algorithmic Thinking · 60m</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How it works */}
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
        <p className="text-sm">Guided coding mastery, built in the Philippines.</p>
        <div className="flex gap-8 text-sm font-medium">
          <button onClick={onStart} className="hover:text-primary transition-colors">Diagnostic</button>
          <button onClick={onStart} className="hover:text-primary transition-colors">Get started</button>
        </div>
      </footer>
    </div>
  );
}
