import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  CheckCircle2, 
  Target,
  Brain,
  TrendingUp,
  Flame,
  Award
} from 'lucide-react';

export default function ProgressScreen() {
  const weeklyActivity = Array.from({ length: 35 }, (_, i) => {
    const rand = Math.random();
    return rand > 0.7 ? 3 : rand > 0.4 ? 2 : rand > 0.2 ? 1 : 0;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold tracking-tight mb-2">Skill Progression</h2>
          <p className="text-lg text-on-surface-variant">Real-time analysis of your technical development.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <Flame size={20} className="text-error" fill="currentColor" />
            <span className="text-sm font-bold">14 Day Streak</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-8 border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Lessons Completed</span>
            <BookOpen size={24} className="text-secondary" />
          </div>
          <div className="mb-4">
            <h3 className="text-5xl font-bold mb-2">12</h3>
            <p className="text-sm text-secondary font-bold">+2 this week</p>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: '60%' }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Activities Done</span>
            <CheckCircle2 size={24} className="text-primary" />
          </div>
          <div className="mb-4">
            <h3 className="text-5xl font-bold mb-2">45</h3>
            <p className="text-sm text-primary font-bold">Total submissions</p>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 border-tertiary/20">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-on-surface-variant uppercase tracking-widest font-bold">Success Rate</span>
            <Target size={24} className="text-tertiary" />
          </div>
          <div className="mb-4">
            <h3 className="text-5xl font-bold mb-2">88%</h3>
            <p className="text-sm text-tertiary font-bold">Top 5%</p>
          </div>
          <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-tertiary" style={{ width: '88%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Topic Mastery Heatmap */}
        <div className="col-span-7 glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Topic Mastery Heatmap</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg text-xs font-bold">Proficient</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold">Developing</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Loops */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Loops</span>
                <span className="text-xs text-secondary font-bold">94% Mastery</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="flex-1 h-8 bg-secondary rounded-lg" />
                ))}
              </div>
            </div>

            {/* Arrays */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Arrays</span>
                <span className="text-xs text-primary font-bold">62% Mastery</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex-1 h-8 bg-primary rounded-lg" />
                ))}
              </div>
            </div>

            {/* Recursion */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">Recursion</span>
                <span className="text-xs text-error font-bold">28% Mastery</span>
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex-1 h-8 bg-error/60 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cognitive Focus */}
        <div className="col-span-5 glass-card rounded-3xl p-8 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-8">Cognitive Focus</h3>
          
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-surface-container"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - 0.75)}`}
                className="text-primary"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain size={48} className="text-primary" />
            </div>
          </div>

          <p className="text-sm text-on-surface-variant mb-8 max-w-xs">
            Your focus is highest in <span className="text-primary font-bold">Logic & Syntax</span>, but needs recalibration in <span className="text-error font-bold">Algorithms Depth</span>.
          </p>

          <button className="px-6 py-3 border border-outline-variant text-on-surface font-bold rounded-xl hover:bg-surface-container-high transition-all text-sm">
            View detailed report
          </button>
        </div>

        {/* Weekly Consistency */}
        <div className="col-span-7 glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Weekly Consistency</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-surface-container" />
                <span className="text-on-surface-variant">Less</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-on-surface-variant">More</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col justify-between text-[10px] text-on-surface-variant font-bold uppercase">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex-1 grid grid-flow-col grid-rows-7 gap-2">
              {weeklyActivity.map((level, idx) => (
                <div 
                  key={idx} 
                  className={`w-full aspect-square rounded transition-all hover:scale-110 cursor-help ${
                    level === 0 ? 'bg-surface-container' : 
                    level === 1 ? 'bg-primary/30' :
                    level === 2 ? 'bg-primary/60' : 'bg-primary'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recommended for You */}
        <div className="col-span-5 glass-card rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={24} className="text-secondary" />
            <h3 className="text-2xl font-bold">Recommended for You</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm">Array Edge Cases</h4>
                <span className="px-2 py-0.5 bg-error/10 text-error rounded text-[10px] font-bold uppercase">High Priority</span>
              </div>
              <p className="text-xs text-on-surface-variant">3 targeted activities to master boundary conditions.</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm">Recursive Base Cases</h4>
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase">Conceptual</span>
              </div>
              <p className="text-xs text-on-surface-variant">Interactive visualizer for stack overflow prevention.</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-secondary/30 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-sm">Space Complexity Quiz</h4>
                <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded text-[10px] font-bold uppercase">Daily</span>
              </div>
              <p className="text-xs text-on-surface-variant">Quick 5-minute drill on Big O for space memory.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
