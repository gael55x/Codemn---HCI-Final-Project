import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Flame, 
  Trophy, 
  Award, 
  Lightbulb, 
  XCircle, 
  Bot,
  ArrowRight,
  TrendingUp,
  User as UserIcon,
  Medal
} from 'lucide-react';

import { UserPreferences } from '../types';

interface Props {
  userPreferences: UserPreferences;
  onResumeLesson?: () => void;
  onViewSyllabus?: () => void;
}

export default function DashboardScreen({ userPreferences, onResumeLesson, onViewSyllabus }: Props) {
  // Stabilized weekly activity heatmap data (deterministic mock data)
  const activityData = React.useMemo(() => {
    const basePattern = [1, 0, 2, 0, 3, 0, 0, 4, 1, 0, 2, 1, 0, 0, 3, 0, 4, 2, 0, 1, 0, 2, 0, 3, 1, 0, 4, 0, 0, 2, 1, 0, 3, 0, 2];
    return Array.from({ length: 84 }, (_, i) => basePattern[i % basePattern.length]);
  }, []);

  // Determine current module based on user path choice
  const getModuleInfo = () => {
    switch (userPreferences.path) {
      case 'backend':
        return {
          title: 'System Design & Node.js',
          focus: 'Focusing on: Express and REST API Architecture',
          progress: '30%',
          width: '30%'
        };
      case 'frontend':
        return {
          title: 'Modern React Patterns',
          focus: 'Focusing on: Hooks and State Management',
          progress: '20%',
          width: '20%'
        };
      default:
        return {
          title: 'JavaScript Fundamentals',
          focus: 'Focusing on: Arrays and Loops',
          progress: '50%',
          width: '50%'
        };
    }
  };

  const moduleInfo = getModuleInfo();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      <section>
        <h2 className="text-5xl font-bold tracking-tight mb-2">
          {userPreferences.level ? `Mabuhay, Gaille Ivan! Ready to code as a ${userPreferences.level}?` : 'Mabuhay, Gaille Ivan! Ready to code?'}
        </h2>
        <p className="text-lg text-on-surface-variant">
          {userPreferences.goal === 'career' ? 'You are on your path to a career switch.' : 'Keep up the excellent learning pace.'} {moduleInfo.title} is waiting for you.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Continue Learning */}
        <div className="col-span-8 glass-card rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full -mr-32 -mt-32 blur-[100px] transition-all group-hover:bg-primary/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-10">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Current Module</span>
              <span className="font-mono text-xs text-on-surface-variant uppercase">Progress: {moduleInfo.progress}</span>
            </div>
            <h3 className="text-4xl font-bold mb-3">{moduleInfo.title}</h3>
            <p className="text-lg text-on-surface-variant mb-8">{moduleInfo.focus}</p>
            <div className="w-full bg-surface-container h-1 rounded-full mb-10 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: moduleInfo.width }}
                className="h-full bg-gradient-to-r from-secondary to-primary"
              />
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <button 
              onClick={onResumeLesson}
              className="px-10 py-4 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 hover:shadow-lg transition-all active:scale-95"
            >
              Resume Lesson
            </button>
            <button 
              onClick={onViewSyllabus}
              className="px-10 py-4 border border-outline-variant text-on-surface font-bold rounded-2xl hover:bg-surface-container-highest transition-all"
            >
              View Syllabus
            </button>
          </div>
        </div>

        {/* Streak Card */}
        <div className="col-span-4 glass-card rounded-3xl p-10 flex flex-col items-center justify-center text-center relative border-primary/20 overflow-hidden group">
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-error/5 rounded-full blur-[60px]" />
          <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-error-container/20 border border-error/30 active-glow">
            <Flame size={48} className="text-error" fill="currentColor" stroke="none" />
          </div>
          <h3 className="text-3xl font-bold mb-2">5 Day Streak 🔥</h3>
          <p className="text-sm text-on-surface-variant max-w-[200px]">Don't break the chain! You're in the top 5% of learners this month.</p>
          <div className="flex gap-1.5 mt-8">
            {[1,1,1,1,1,0,0].map((v, i) => (
              <div 
                key={i} 
                className={`w-2 h-10 rounded-full transition-all duration-500 ${v ? 'bg-secondary h-12 shadow-[0_0_10px_rgba(79,219,200,0.5)]' : 'bg-surface-container'}`}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard Card */}
        <div className="col-span-4 glass-card rounded-3xl p-8 border-t-4 border-primary">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Medal className="text-primary" />
              <h4 className="text-xl font-bold">Diamond League</h4>
            </div>
            <span className="text-xs text-on-surface-variant font-bold">#4 / 30</span>
          </div>
          <div className="space-y-3">
            {[
              { pos: 2, name: 'Sarah C.', xp: '2,450', current: false },
              { pos: 4, name: 'You', xp: '2,120', current: true },
              { pos: 5, name: 'David L.', xp: '1,980', current: false },
            ].map((user) => (
              <div 
                key={user.name}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  user.current 
                  ? 'bg-primary/10 border-primary shadow-sm' 
                  : 'bg-surface-container-low/50 border-outline-variant/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold ${user.current ? 'text-primary' : 'text-on-surface-variant'}`}>{user.pos}.</span>
                  <span className={`text-sm ${user.current ? 'font-bold' : ''}`}>{user.name}</span>
                </div>
                <span className="font-mono text-xs text-primary font-bold">{user.xp} XP</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-[0.2em] pt-4">View All Standings</button>
        </div>

        {/* Weekly Activity */}
        <div className="col-span-8 glass-card rounded-3xl p-10">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-2xl font-bold">Weekly Activity</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-surface-container" />
                <span className="text-xs text-on-surface-variant font-medium">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-sm bg-primary shadow-[0_0_8px_rgba(192,193,255,0.4)]" />
                <span className="text-xs text-on-surface-variant font-medium">High</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col justify-between pt-1 pb-1 text-[10px] text-on-surface-variant font-bold uppercase py-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex-1 grid grid-flow-col grid-rows-7 gap-2">
              {activityData.map((level, idx) => (
                <div 
                  key={idx} 
                  className={`heatmap-cell transition-all duration-500 hover:scale-125 hover:z-10 cursor-help ${
                    level === 0 ? 'bg-surface-container' : 
                    level === 1 ? 'bg-primary/20' :
                    level === 2 ? 'bg-primary/40' :
                    level === 3 ? 'bg-primary/70' : 'bg-primary shadow-[0_0_10px_rgba(192,193,255,0.3)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Mistakes */}
        <div className="col-span-5 glass-card rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold">Recent Mistakes</h4>
            <span className="px-3 py-1 bg-error/10 text-error rounded-lg text-xs font-bold uppercase tracking-wider">2 Pending</span>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Off-by-one errors in Loop', code: 'Incorrect index termination in for-loop.' },
              { title: 'Arrow Function scope', code: "Confusion with 'this' binding in object." },
            ].map((err, i) => (
              <div key={i} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-error/30 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-error/10 rounded-lg text-error">
                    <XCircle size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm mb-1">{err.title}</h5>
                    <p className="text-xs font-mono text-on-surface-variant opacity-70">{err.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-primary font-bold hover:bg-primary/10 transition-all rounded-xl text-sm">Practice These Now</button>
        </div>

        {/* AI Suggestion */}
        <div className="col-span-7 glass-card rounded-3xl p-10 border border-tertiary/20 bg-gradient-to-br from-tertiary/5 to-transparent relative overflow-hidden group">
          <div className="absolute -right-16 -bottom-16 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
            <Bot size={240} />
          </div>
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-tertiary text-surface flex items-center justify-center">
                <Bot size={24} fill="currentColor" stroke="none" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-tertiary">AI Mentor Advice</h4>
                <p className="text-xs text-on-surface-variant uppercase font-bold tracking-widest">Personalized Recommendation</p>
              </div>
            </div>
            <p className="text-2xl leading-relaxed mb-10">
              "You're making great progress with Loops, Gaille! Ready to try a <span className="text-tertiary font-bold underline decoration-tertiary/30">nested loop challenge</span>? It will solidify your multi-dimensional mapping skills."
            </p>
            <button className="flex items-center gap-3 px-8 py-4 bg-tertiary text-surface font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all">
              Launch Insight Task
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
