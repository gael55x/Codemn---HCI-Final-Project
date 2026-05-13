import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Clock, 
  BookOpen, 
  ChevronRight,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Globe
} from 'lucide-react';
import { Module } from '../types';

interface Props {
  onSelectModule: (id: string) => void;
}

export default function LibraryScreen({ onSelectModule }: Props) {
  const [activeFilter, setActiveFilter] = React.useState('All Paths');

  const allModules: Module[] = [
    {
      id: 'js-fundamentals',
      title: 'JavaScript Fundamentals',
      description: 'Master variables, data types, and core logic concepts.',
      progress: 50,
      difficulty: 'Beginner',
      language: 'JavaScript',
      status: 'In Progress',
      estimatedTime: '4h 30m'
    },
    {
      id: 'react-patterns',
      title: 'Modern React Patterns',
      description: 'Learn hooks, composition, and state management like a pro.',
      progress: 0,
      difficulty: 'Intermediate',
      language: 'React / TS',
      status: 'New',
      estimatedTime: '6h 15m'
    },
    {
      id: 'backend-architecture',
      title: 'System Design & Node.js',
      description: 'Build scalable APIs and understand distributed systems.',
      progress: 0,
      difficulty: 'Advanced',
      language: 'Node.js',
      status: 'New',
      estimatedTime: '12h 00m'
    },
    {
      id: 'database-logic',
      title: 'SQL & NoSQL Mastery',
      description: 'Optimization strategies for Postgres and MongoDB.',
      progress: 0,
      difficulty: 'Intermediate',
      language: 'SQL / Mongo',
      status: 'New',
      estimatedTime: '8h 45m'
    }
  ];

  const filterModules = (filter: string) => {
    if (filter === 'All Paths') return allModules;
    if (filter === 'Frontend') return allModules.filter(m => 
      m.id === 'js-fundamentals' || m.id === 'react-patterns'
    );
    if (filter === 'Backend') return allModules.filter(m => 
      m.id === 'backend-architecture' || m.id === 'database-logic'
    );
    if (filter === 'Fullstack') return allModules;
    if (filter === 'DevOps') return [];
    if (filter === 'Mobile') return [];
    return allModules;
  };

  const modules = filterModules(activeFilter);

  const getIcon = (title: string) => {
    if (title.includes('JavaScript')) return <Terminal className="text-secondary" />;
    if (title.includes('React')) return <Cpu className="text-primary" />;
    if (title.includes('System')) return <Layers className="text-tertiary" />;
    return <Database className="text-secondary" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-bold tracking-tight mb-4">Course Library</h2>
          <p className="text-on-surface-variant text-lg">Explored {modules.length} modules tailored to your level.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-surface-container p-1 rounded-xl border border-outline-variant/10">
            <button className="p-2 bg-surface-container-highest text-primary rounded-lg shadow-sm">
              <LayoutGrid size={20} />
            </button>
            <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
        <button 
          onClick={() => setActiveFilter('All Paths')}
          className={`px-6 py-2.5 font-bold rounded-full text-sm ${
            activeFilter === 'All Paths' 
            ? 'bg-primary text-surface' 
            : 'glass-card border-outline-variant/10 text-on-surface-variant hover:border-primary/40 hover:text-on-surface transition-all'
          }`}
        >
          All Paths
        </button>
        {['Frontend', 'Backend', 'Fullstack', 'DevOps', 'Mobile'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveFilter(cat)}
            className={`px-6 py-2.5 rounded-full text-sm whitespace-nowrap ${
              activeFilter === cat
              ? 'bg-primary text-surface font-bold'
              : 'glass-card border-outline-variant/10 text-on-surface-variant hover:border-primary/40 hover:text-on-surface transition-all'
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Filter by:</span>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-outline-variant/10 rounded-xl hover:bg-surface-container-high transition-all">
            Difficulty <Filter size={14} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.length === 0 ? (
          <div className="col-span-2 glass-card rounded-[32px] p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container mb-6 flex items-center justify-center">
              <Globe size={24} className="text-on-surface-variant" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
            <p className="text-sm text-on-surface-variant max-w-md">
              {activeFilter} courses are currently being developed. Check back soon for new content!
            </p>
          </div>
        ) : (
          <>
            {modules.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectModule(module.id)}
                className="group glass-card rounded-[32px] p-8 cursor-pointer border-outline-variant/5 hover:border-primary/20 transition-all relative overflow-hidden"
              >
                {module.progress > 0 && (
                  <div className="absolute top-0 right-0 p-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-4 border-surface-container ring-2 ring-primary/20">
                      <span className="text-[10px] font-bold text-primary">{module.progress}%</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    {getIcon(module.title)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        module.difficulty === 'Beginner' ? 'bg-secondary/10 text-secondary' :
                        module.difficulty === 'Intermediate' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'
                      }`}>
                        {module.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant opacity-60">{module.language}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{module.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{module.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
                  <div className="flex items-center gap-6 text-on-surface-variant">
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={16} />
                      {module.estimatedTime}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <BookOpen size={16} />
                      18 Lessons
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-primary font-bold text-sm transition-all translate-x-4 group-hover:translate-x-0">
                    Continue Path <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Coming Soon Card */}
            {modules.length > 0 && modules.length < 4 && (
              <div className="glass-card rounded-[32px] p-8 flex flex-col items-center justify-center text-center opacity-50 border-dashed border-2 border-outline-variant/20">
                <div className="w-16 h-16 rounded-full bg-surface-container mb-6 flex items-center justify-center">
                  <Globe size={24} className="text-on-surface-variant" />
                </div>
                <h3 className="text-xl font-bold mb-2">More Coming Soon</h3>
                <p className="text-xs text-on-surface-variant max-w-[200px]">Additional {activeFilter.toLowerCase()} courses in development.</p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
