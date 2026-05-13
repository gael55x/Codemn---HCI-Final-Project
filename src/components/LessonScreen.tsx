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
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface Props {
  moduleId: string;
  onStartCoding: () => void;
}

const lessonData: Record<string, {
  module: string;
  title: string;
  description: string;
  codeExample: string;
  quiz: {
    question: string;
    code: string;
    options: (string | number)[];
    correctAnswer: number;
  };
  tip: string;
}> = {
  'js-fundamentals': {
    module: 'Module 03',
    title: 'Arrays and Loops',
    description: 'In programming, an Array is a data structure used to store a collection of elements. Think of it as a labeled box with compartments, where each compartment holds a specific item. Accessing these items is done through Indices, which always start at zero.',
    codeExample: `const fruits = ["Apple", "Banana", "Cherry"];

// Accessing by index
console.log(fruits[0]); // Output: "Apple"

// Looping through the array
fruits.forEach((fruit) => {
  console.log(\`I like \${fruit}\`);
});`,
    quiz: {
      question: 'Given the following array, what is the value of data[2]?',
      code: 'const data = [10, 20, 30, 40];',
      options: [10, 30, 20, 40],
      correctAnswer: 1
    },
    tip: 'JavaScript arrays are zero-indexed. Count from 0, 1, 2...'
  },
  'react-patterns': {
    module: 'Module 01',
    title: 'React Hooks Fundamentals',
    description: 'React Hooks allow you to use state and other React features without writing a class. The useState hook lets you add state to functional components, making them more powerful and easier to understand.',
    codeExample: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    quiz: {
      question: 'What does useState return?',
      code: 'const [value, setValue] = useState(0);',
      options: ['An object', 'An array', 'A function', 'A number'],
      correctAnswer: 1
    },
    tip: 'useState always returns an array with exactly two elements: the current state and a setter function.'
  },
  'backend-architecture': {
    module: 'Module 02',
    title: 'RESTful API Design',
    description: 'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP methods to perform CRUD operations and follow consistent patterns for resource management.',
    codeExample: `const express = require('express');
const app = express();

// GET - Read resource
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ id: userId, name: 'John' });
});

// POST - Create resource
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});`,
    quiz: {
      question: 'Which HTTP method is used to update a resource?',
      code: 'app.___(\'/api/users/:id\', handler);',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 2
    },
    tip: 'Remember: GET (read), POST (create), PUT (update), DELETE (remove).'
  },
  'database-logic': {
    module: 'Module 04',
    title: 'SQL Joins and Relations',
    description: 'SQL joins combine rows from two or more tables based on a related column. Understanding joins is crucial for working with relational databases and retrieving data efficiently.',
    codeExample: `-- INNER JOIN: Returns matching records
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN: Returns all from left table
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
    quiz: {
      question: 'Which join returns all records from the left table?',
      code: 'SELECT * FROM users ___ JOIN orders ON users.id = orders.user_id;',
      options: ['INNER', 'LEFT', 'RIGHT', 'FULL'],
      correctAnswer: 1
    },
    tip: 'LEFT JOIN keeps all left table records, even without matches. INNER JOIN only keeps matches.'
  }
};

export default function LessonScreen({ moduleId, onStartCoding }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const lesson = lessonData[moduleId] || lessonData['js-fundamentals'];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-10 max-w-7xl mx-auto"
    >
      {/* Content Area */}
      <div className="flex-1 max-w-3xl space-y-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-widest">{lesson.module}</span>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
              Library <ChevronRight size={14} /> {moduleId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </div>
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-6">{lesson.title}</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-on-surface-variant leading-relaxed">
              {lesson.description}
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
            <pre className="whitespace-pre-wrap text-on-surface">
              {lesson.codeExample}
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
            {lesson.quiz.question}
          </p>
          <div className="bg-[#020b14] p-4 rounded-xl font-mono text-xs text-on-surface-variant mb-8 border border-white/5">
            {lesson.quiz.code}
          </div>

          <div className="space-y-3">
            {lesson.quiz.options.map((v, i) => (
              <button
                key={i}
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
              Pro tip: {lesson.tip}
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              <span>Course Progress</span>
              <span className="text-primary">50%</span>
            </div>
            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-secondary to-primary" style={{ width: '50%' }} />
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
