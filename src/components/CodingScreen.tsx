import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  RotateCw, 
  Terminal, 
  Bug, 
  Lightbulb, 
  CheckCircle,
  Copy,
  ChevronRight,
  Code2,
  Cpu,
  MoreVertical,
  Zap
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function CodingScreen({ onBack }: Props) {
  const [code, setCode] = useState(`// Instruction: Sort the array of products
// based on their price (ascending).

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];

// Your logic here:
const sorted = products.slice().sort((a, b) => {
  return a.price - b.price;
});

console.log(sorted);`);

  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate runtime
    setTimeout(() => {
      setOutput([
        '> [Log] Running sequence...',
        '> Array(3) [',
        '  { name: "Mouse", price: 25 },',
        '  { name: "Keyboard", price: 75 },',
        '  { name: "Laptop", price: 1200 }',
        ']',
        '> Process finished with exit code 0'
      ]);
      setIsRunning(false);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[calc(100vh-160px)] flex flex-col gap-6"
    >
      {/* Task Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Activity 03.1</span>
              <div className="w-1 h-1 rounded-full bg-outline-variant" />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Array Sorting</span>
            </div>
            <h2 className="text-2xl font-bold">Price Filter Logic</h2>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 glass-card border-outline-variant/10 text-xs font-bold hover:bg-surface-container-high transition-all rounded-xl">
             <RotateCw size={16} /> Reset
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-8 py-2.5 bg-secondary text-surface font-bold rounded-xl shadow-lg transition-all active:scale-95 ${isRunning ? 'opacity-50' : 'hover:brightness-110'}`}
          >
             <Play size={16} fill="currentColor" stroke="none" /> Run Code
          </button>
          <button className="px-8 py-2.5 bg-primary text-surface font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">
             Submit Task
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        {/* Editor (Mockup) */}
        <div className="col-span-8 glass-card rounded-[32px] flex flex-col min-h-0 border-outline-variant/5 overflow-hidden">
          <div className="px-6 py-3 bg-surface-container-highest/30 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
            <div className="flex gap-1">
               <button className="px-4 py-1.5 bg-surface-container-highest rounded-lg text-[11px] font-bold text-primary flex items-center gap-2">
                 <Code2 size={14} /> sorting.js
               </button>
               <button className="px-4 py-1.5 hover:bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant transition-colors">
                 utils.js
               </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-on-surface-variant italic">Ready</span>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>
          </div>
          
          <div className="flex-1 p-8 font-mono text-[15px] leading-relaxed overflow-y-auto bg-[#020b14] custom-scrollbar">
            <textarea
              spellCheck={false}
              className="w-full h-full bg-transparent border-none outline-none resize-none custom-scrollbar p-0 text-on-surface-variant selection:bg-primary/20"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        {/* Sidemenu / Output */}
        <div className="col-span-4 flex flex-col gap-6 min-h-0">
          <div className="flex-1 glass-card rounded-[32px] flex flex-col p-8 min-h-0 border-outline-variant/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
               <Terminal size={16} /> Console Output
            </h3>
            <div className="flex-1 bg-surface-container-low rounded-2xl p-6 font-mono text-[13px] leading-6 overflow-y-auto custom-scrollbar text-secondary/80">
              {isRunning ? (
                <div className="flex items-center gap-2">
                  <RotateCw size={14} className="animate-spin" />
                  Compiling...
                </div>
              ) : output.length > 0 ? (
                output.map((line, i) => <div key={i} className={line.includes('Error') ? 'text-error' : ''}>{line}</div>)
              ) : (
                <div className="opacity-30 italic">No output yet. Run your script to see results.</div>
              )}
            </div>
          </div>

          <div className="glass-card rounded-[32px] p-8 border-tertiary/20 relative group overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
             <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                  <Zap size={18} fill="currentColor" stroke="none" />
                </div>
                <h4 className="font-bold text-sm">AI Helper active</h4>
             </div>
             <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                "Stuck? Try checking the <span className="text-tertiary font-bold">.sort()</span> syntax. Remember that it modifies the original array unless you slice it!"
             </p>
             <button className="w-full text-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-on-surface transition-colors">
               Ask AI to debug logic
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
