import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  Cpu,
  Code2,
  Terminal,
  Zap,
  Copy,
  Lightbulb
} from 'lucide-react';

interface Props {
  onStartCoding: () => void;
}

export default function LessonScreen({ onStartCoding }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-10"
    >
      {/* Content Area */}
      <div className="flex-1 max-w-3xl space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-widest">Module 03</span>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              Library <ChevronRight size={14} /> JavaScript Fundamentals
            </div>
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-6">Arrays and Loops</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-on-surface-variant leading-relaxed">
              In programming, an <span className="text-secondary font-bold">Array</span> is a data structure used to store a collection of elements. Think of it as a labeled box with compartments, where each compartment holds a specific item. Accessing these items is done through <span className="text-primary font-bold">Indices</span>, which always start at zero.
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="glass-card rounded-[32px] overflow-hidden border-outline-variant/10 active-glow">
          <div className="bg-surface-container-highest/30 px-8 py-4 border-b border-outline-variant/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/40" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="font-mono text-[10px] uppercase font-bold text-on-surface-variant ml-4 tracking-widest">Example: main.js</span>
            </div>
            <button className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
              <Copy size={16} />
            </button>
          </div>
          <div className="p-8 font-mono text-[15px] leading-relaxed bg-[#020b14]">
            <pre className="whitespace-pre-wrap">
              <span className="text-tertiary">const</span> <span className="text-primary">fruits</span> = [<span className="text-secondary">"Apple"</span>, <span className="text-secondary">"Banana"</span>, <span className="text-secondary">"Cherry"</span>];{"\n\n"}
              <span className="text-on-surface-variant">// Accessing by index</span>{"\n"}
              <span className="text-secondary">console</span>.<span className="text-primary-container">log</span>(<span className="text-primary">fruits</span>[<span className="text-secondary">0</span>]); <span className="text-on-surface-variant">// Output: "Apple"</span>{"\n\n"}
              <span className="text-on-surface-variant">// Looping through the array</span>{"\n"}
              <span className="text-primary">fruits</span>.<span className="text-primary-container">forEach</span>((<span className="text-on-surface">fruit</span>) ={'>'} {"{"}{"\n"}
              {"  "}<span className="text-secondary">console</span>.<span className="text-primary-container">log</span>(<span className="text-secondary">`I like {'${fruit}'}`</span>);{"\n"}
              {"}"});
            </pre>
          </div>
        </div>

        <button className="w-full group p-8 glass-card rounded-3xl flex items-center gap-8 text-left hover:border-tertiary/40 hover:bg-tertiary/5 transition-all">
          <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
            <HelpCircle size={32} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-tertiary mb-1">Explain differently</h4>
            <p className="text-on-surface-variant text-sm">Struggling with indices? Let the AI Mentor use a real-world analogy to simplify the logic.</p>
          </div>
          <ArrowRight className="text-on-surface-variant opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
        </button>
      </div>

      {/* Quiz Area */}
      <div className="w-[360px] space-y-8">
        <div className="glass-card rounded-[32px] p-8 border-secondary/20">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-6">
            <CheckCircle2 size={24} className="text-secondary" /> Mini-check
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
            Given the following array, what is the value of <code className="font-mono text-primary bg-primary/10 px-1 rounded">data[2]</code>?
          </p>
          <div className="bg-[#020b14] p-4 rounded-xl font-mono text-xs text-on-surface-variant mb-8 border border-white/5">
            const data = [10, 20, 30, 40];
          </div>

          <div className="space-y-3">
            {[10, 30, 20, 40].map((v, i) => (
              <button
                key={v}
                onClick={() => setSelectedAnswer(i)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedAnswer === i 
                  ? 'bg-primary/10 border-primary shadow-sm' 
                  : 'bg-surface-container-high border-outline-variant/10 hover:border-primary/40'
                }`}
              >
                <span className={`text-sm font-bold ${selectedAnswer === i ? 'text-primary' : ''}`}>{v}</span>
                <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                  selectedAnswer === i ? 'border-primary' : 'border-outline'
                }`}>
                  {selectedAnswer === i && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-4 p-4 rounded-2xl bg-secondary/5 border border-secondary/20">
            <Lightbulb size={20} className="text-secondary shrink-0" />
            <p className="text-[11px] leading-relaxed text-on-surface-variant">
              Pro tip: JavaScript arrays are <span className="text-secondary">zero-indexed</span>. Count from 0, 1, 2...
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              <span>Course Progress</span>
              <span className="text-primary">65%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-primary" style={{ width: '65%' }} />
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={onStartCoding}
              className="w-full py-5 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              Start Coding Activity
              <Code2 size={20} />
            </button>
            <button className="w-full py-4 text-on-surface-variant font-bold hover:text-on-surface transition-colors">Skip Lesson</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
