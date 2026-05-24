import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronRight, 
  Code2,
  Copy
} from 'lucide-react';

interface Props {
  moduleId: string;
  onStartCoding: () => void;
  onAskAI: (text: string) => void;
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
      code: 'app.___(\'\/api\/users\/:id\', handler);',
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

export default function LessonScreen({ moduleId, onStartCoding, onAskAI }: Props) {
  const [copied, setCopied] = useState(false);
  
  const lesson = lessonData[moduleId] || lessonData['js-fundamentals'];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lesson.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-10"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-widest">{lesson.module}</span>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            Library <ChevronRight size={14} /> {moduleId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </div>
        </div>
        <h2 className="text-5xl font-bold tracking-tight mb-6">{lesson.title}</h2>
        <p className="text-xl text-on-surface-variant leading-relaxed">
          {lesson.description}
        </p>
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
          <button 
            onClick={handleCopyCode}
            className="px-3 py-1.5 hover:bg-surface-container rounded-lg text-on-surface-variant transition-all flex items-center gap-1.5 hover:text-primary active:scale-95"
            title="Copy code to clipboard"
          >
            {copied ? (
              <span className="text-[10px] text-secondary font-bold font-mono">Copied!</span>
            ) : null}
            <Copy size={16} />
          </button>
        </div>
        <div className="p-8 font-mono text-[15px] leading-relaxed bg-[#020b14]">
          <pre className="whitespace-pre-wrap text-on-surface">
            {lesson.codeExample}
          </pre>
        </div>
      </div>

      {/* Progress + CTA */}
      <div className="space-y-5 pt-2 pb-10">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            <span>Course Progress</span>
            <span className="text-primary">50%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-secondary to-primary" style={{ width: '50%' }} />
          </div>
        </div>

        <motion.button 
          onClick={onStartCoding}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-5 font-bold rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #7c6af7 0%, #4fdbc8 100%)',
            boxShadow: '0 0 32px rgba(124, 106, 247, 0.55), 0 0 64px rgba(79, 219, 200, 0.25)',
            color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.18)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.75, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-2xl"
            style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
          />
          <span className="relative z-10 text-base tracking-wide">Start Coding Activity</span>
          <Code2 size={20} className="relative z-10" />
        </motion.button>

        <button 
          onClick={onStartCoding}
          className="w-full py-3 text-on-surface-variant font-bold hover:text-on-surface transition-colors text-center"
        >
          Skip Lesson
        </button>
      </div>
    </motion.div>
  );
}
