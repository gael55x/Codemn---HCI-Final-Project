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
  onComplete: () => void;
  onAskAI: (text: string) => void;
}

const STARTER_CODE = `// Instruction: Sort the array of products
// based on their price (ascending).

const products = [
  { name: "Laptop", price: 1200 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 }
];

// Your logic here:
const sorted = products.slice().sort((a, b) => {
  // TODO: Return sorting evaluation logic (e.g. price ascending)
  
});

console.log(sorted);`;

export default function CodingScreen({ onBack, onComplete, onAskAI }: Props) {
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate runtime evaluation
    setTimeout(() => {
      const hasCorrectSorting = code.includes('a.price - b.price') || code.includes('a.price-b.price');
      const hasSortedDeclaration = code.includes('const sorted') || code.includes('let sorted');

      if (!hasSortedDeclaration) {
        setOutput([
          '> [Error] ReferenceError: sorted is not defined',
          '  at sorting.js:12',
          '> Process finished with exit code 1'
        ]);
      } else if (hasCorrectSorting) {
        setOutput([
          '> [Log] Running sorting test...',
          '> Array(3) [',
          '  { name: "Mouse", price: 25 },',
          '  { name: "Keyboard", price: 75 },',
          '  { name: "Laptop", price: 1200 }',
          ']',
          '> [Success] Test passed: array sorted ascending by price!',
          '> Process finished with exit code 0'
        ]);
      } else {
        setOutput([
          '> [Log] Running sorting test...',
          '> Array(3) [',
          '  { name: "Laptop", price: 1200 },',
          '  { name: "Mouse", price: 25 },',
          '  { name: "Keyboard", price: 75 }',
          ']',
          '> [Error] Test failed: array is not sorted by price ascending.',
          '  Expected Mouse ($25) first, Laptop ($1200) last.',
          '> Process finished with exit code 1'
        ]);
      }
      setIsRunning(false);
    }, 800);
  };

  const handleReset = () => {
    setCode(STARTER_CODE);
    setOutput([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd, value } = textarea;

    // Tab key support
    if (e.key === 'Tab') {
      e.preventDefault();
      const newCode = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
      }, 0);
    }

    // Auto-closing brackets / quotes
    const pairs: Record<string, string> = {
      '{': '}',
      '[': ']',
      '(': ')',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    if (pairs[e.key] !== undefined) {
      e.preventDefault();
      const closingChar = pairs[e.key];
      const newCode = value.substring(0, selectionStart) + e.key + closingChar + value.substring(selectionEnd);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleAskAIDebug = () => {
    onAskAI(`Here is my current code for the sorting task:
\`\`\`javascript
${code}
\`\`\`
Can you explain what is wrong or give me a hint on how to sort the products ascending by price? Keep it brief and friendly.`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 lg:h-[calc(100vh-160px)]"
    >
      {/* Task Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors cursor-pointer">
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

        <div className="flex flex-wrap gap-2 sm:gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2.5 glass-card border-outline-variant/10 text-xs font-bold hover:bg-surface-container-high transition-all rounded-xl cursor-pointer"
          >
             <RotateCw size={16} /> Reset
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-8 py-2.5 bg-secondary text-surface font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer ${isRunning ? 'opacity-50' : 'hover:brightness-110'}`}
          >
             <Play size={16} fill="currentColor" stroke="none" /> Run Code
          </button>
          <button
            onClick={() => {
              setOutput([
                '> Submitting solution for review...',
                '> Array sorted successfully!',
                '> Task completed! 100 XP awarded.'
              ]);
              setCompleted(true);
            }}
            className="px-8 py-2.5 bg-primary text-surface font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
             Submit Task
          </button>
        </div>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-secondary/10 border border-secondary/30"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-secondary shrink-0" size={22} />
            <div>
              <p className="font-bold">Activity complete — +100 XP</p>
              <p className="text-sm text-on-surface-variant">Nice work. This step is now marked done on your roadmap.</p>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-secondary text-surface font-bold rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            Back to roadmap <ChevronRight size={18} />
          </button>
        </motion.div>
      )}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Editor (Mockup) */}
        <div className="lg:col-span-8 glass-card rounded-[32px] flex flex-col min-h-[340px] lg:min-h-0 border-outline-variant/5 overflow-hidden">
          <div className="px-6 py-3 bg-surface-container-highest/30 border-b border-outline-variant/10 flex justify-between items-center shrink-0">
            <div className="flex gap-1">
               <button className="px-4 py-1.5 bg-surface-container-highest rounded-lg text-[11px] font-bold text-primary flex items-center gap-2">
                 <Code2 size={14} /> sorting.js
               </button>
               <button className="px-4 py-1.5 hover:bg-surface-container rounded-lg text-[11px] font-bold text-on-surface-variant transition-colors cursor-pointer">
                 utils.js
               </button>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCopyCode}
                className="p-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors mr-2 cursor-pointer flex items-center gap-1"
                title="Copy code"
              >
                {copied ? <span className="text-[10px] text-secondary font-bold font-mono">Copied!</span> : null}
                <Copy size={14} />
              </button>
              <span className="text-[10px] font-mono text-on-surface-variant italic">Ready</span>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
            </div>
          </div>
          
          <div className="flex-1 p-8 font-mono text-[15px] leading-relaxed overflow-y-auto bg-[#020b14] custom-scrollbar">
            <textarea
              spellCheck={false}
              className="w-full h-full bg-transparent border-none outline-none resize-none custom-scrollbar p-0 text-on-surface-variant selection:bg-primary/20 focus:ring-0"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        {/* Sidemenu / Output */}
        <div className="lg:col-span-4 flex flex-col gap-6 min-h-0">
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
                output.map((line, i) => <div key={i} className={line.includes('Error') ? 'text-error' : line.includes('Success') ? 'text-secondary font-bold' : ''}>{line}</div>)
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
             <button 
               onClick={handleAskAIDebug}
               className="w-full text-center text-[10px] font-bold text-on-surface-variant uppercase tracking-widest hover:text-on-surface transition-colors cursor-pointer"
             >
               Ask AI to debug logic
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
