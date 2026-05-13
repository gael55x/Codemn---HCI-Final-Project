import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Clock,
  BookOpen,
  Code2,
  ArrowLeft
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function SyllabusScreen({ onBack }: Props) {
  const modules = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      lessons: [
        { name: 'What is JavaScript?', duration: '15 min', completed: true },
        { name: 'Variables and Data Types', duration: '20 min', completed: true },
        { name: 'Operators and Expressions', duration: '18 min', completed: true }
      ],
      completed: true
    },
    {
      id: 2,
      title: 'Control Flow',
      lessons: [
        { name: 'If-Else Statements', duration: '22 min', completed: true },
        { name: 'Switch Cases', duration: '15 min', completed: true },
        { name: 'Ternary Operators', duration: '12 min', completed: true }
      ],
      completed: true
    },
    {
      id: 3,
      title: 'Arrays and Loops',
      lessons: [
        { name: 'Array Basics', duration: '25 min', completed: true },
        { name: 'For Loops', duration: '20 min', completed: true },
        { name: 'Array Methods', duration: '30 min', completed: false, current: true },
        { name: 'Nested Loops', duration: '28 min', completed: false }
      ],
      completed: false,
      current: true
    },
    {
      id: 4,
      title: 'Functions',
      lessons: [
        { name: 'Function Declaration', duration: '18 min', completed: false },
        { name: 'Arrow Functions', duration: '20 min', completed: false },
        { name: 'Callbacks', duration: '25 min', completed: false }
      ],
      completed: false,
      locked: true
    },
    {
      id: 5,
      title: 'Objects and Classes',
      lessons: [
        { name: 'Object Literals', duration: '22 min', completed: false },
        { name: 'Object Methods', duration: '18 min', completed: false },
        { name: 'ES6 Classes', duration: '30 min', completed: false }
      ],
      completed: false,
      locked: true
    }
  ];

  const totalLessons = 16;
  const completedLessons = 8;
  const progress = 50;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 max-w-5xl mx-auto"
    >
      <div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </button>
        
        <h2 className="text-5xl font-bold tracking-tight mb-4">JavaScript Fundamentals</h2>
        <p className="text-lg text-on-surface-variant mb-8">Master variables, data types, and core logic concepts.</p>
        
        <div className="glass-card rounded-3xl p-8 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-on-surface-variant mb-1">Course Progress</p>
              <p className="text-3xl font-bold">{progress}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-on-surface-variant mb-1">Lessons Completed</p>
              <p className="text-3xl font-bold">{completedLessons}/{totalLessons}</p>
            </div>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {modules.map((module, idx) => (
          <div 
            key={module.id}
            className={`glass-card rounded-3xl p-8 border transition-all ${
              module.current ? 'border-primary/40' : 'border-outline-variant/10'
            } ${module.locked ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  module.completed ? 'bg-secondary/10 text-secondary' :
                  module.current ? 'bg-primary/10 text-primary' :
                  'bg-surface-container text-on-surface-variant'
                }`}>
                  {module.locked ? <Lock size={24} /> :
                   module.completed ? <CheckCircle2 size={24} /> :
                   <BookOpen size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">Module {module.id}</h3>
                    {module.current && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                        In Progress
                      </span>
                    )}
                    {module.completed && (
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-on-surface-variant">{module.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-on-surface-variant">
                  {module.lessons.filter(l => l.completed).length}/{module.lessons.length} Lessons
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-16">
              {module.lessons.map((lesson, lessonIdx) => (
                <div 
                  key={lessonIdx}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                    lesson.current ? 'bg-primary/5 border border-primary/20' :
                    lesson.completed ? 'bg-surface-container-low/50' :
                    'bg-surface-container-low/30'
                  } ${!module.locked && !lesson.completed ? 'hover:bg-surface-container-high cursor-pointer' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {lesson.completed ? (
                      <CheckCircle2 size={20} className="text-secondary" />
                    ) : lesson.current ? (
                      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                    ) : (
                      <Circle size={20} className="text-on-surface-variant" />
                    )}
                    <span className={`text-sm ${lesson.current ? 'font-bold text-primary' : lesson.completed ? 'font-medium' : 'text-on-surface-variant'}`}>
                      {lesson.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <Clock size={14} />
                    {lesson.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
