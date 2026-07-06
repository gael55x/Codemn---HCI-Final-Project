import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS, computeDiagnostic, DiagnosticResult } from '../data/demo-data';

interface Props {
  onComplete: (result: DiagnosticResult) => void;
}

export default function DiagnosticScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const question = DIAGNOSTIC_QUESTIONS[step];
  const total = DIAGNOSTIC_QUESTIONS.length;
  const selected = answers[question.id];
  const isLast = step === total - 1;

  const handleSelect = (index: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: index }));
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(computeDiagnostic(answers));
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl glass-card rounded-[32px] overflow-hidden"
      >
        {/* Progress header */}
        <div className="px-12 pt-12 pb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-primary">
              <Zap size={18} fill="currentColor" stroke="none" />
              <span className="text-sm font-bold tracking-tight">Skill Diagnostic</span>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">
              Question {step + 1} of {total}
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-primary"
              animate={{ width: `${((step + 1) / total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="px-12 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 leading-snug">{question.prompt}</h2>
                {question.code && (
                  <pre className="p-6 rounded-2xl bg-[#020b14] border border-outline-variant/10 font-mono text-sm leading-relaxed text-on-surface overflow-x-auto whitespace-pre-wrap">
                    {question.code}
                  </pre>
                )}
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl bg-surface-container border transition-all duration-200 text-left font-mono text-sm ${
                      selected === index
                        ? 'border-primary bg-primary/5 active-glow'
                        : 'border-outline-variant/10 hover:border-primary/50'
                    }`}
                  >
                    <span className={selected === index ? 'text-primary font-bold' : ''}>{option}</span>
                    {selected === index && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <CheckCircle className="text-primary" size={20} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={selected === undefined}
                  className="group px-10 py-4 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isLast ? 'See my results' : 'Next'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-surface-container-low/50 px-12 py-5 text-center border-t border-outline-variant/10">
          <p className="text-xs text-on-surface-variant">
            No grades, no pressure — this just maps where to start.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
