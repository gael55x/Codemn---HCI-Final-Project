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
  },
  'dsa-arrays': {
    module: 'DSA 01',
    title: 'Arrays & Hashing',
    description: 'A hash map (object/Map) gives you O(1) average-time lookups. Reaching for one is often what turns a slow O(n²) nested-loop solution into a fast O(n) single pass — a core habit for solving array problems.',
    codeExample: `// Two Sum: find indices that add up to target
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}
console.log(twoSum([2, 7, 11], 9)); // [0, 1]`,
    quiz: {
      question: 'What is the average lookup time of a hash map?',
      code: 'map.has(key);',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
      correctAnswer: 2
    },
    tip: 'Trade space for time: a hash map turns an O(n²) search into a single O(n) pass.'
  },
  'dsa-recursion': {
    module: 'DSA 02',
    title: 'Recursion',
    description: 'Every recursion needs two things: a base case that stops it, and a recursive step that moves toward that base case. Write the base case first — if it can never be reached, you get a stack overflow.',
    codeExample: `function factorial(n) {
  if (n <= 1) return 1;      // base case
  return n * factorial(n - 1); // recursive step
}
console.log(factorial(5)); // 120`,
    quiz: {
      question: 'What stops a recursive function from running forever?',
      code: 'function f(n) { /* ... */ }',
      options: ['A loop', 'The base case', 'The return type', 'The call stack'],
      correctAnswer: 1
    },
    tip: 'Trace one small input by hand. If it never hits the base case, the recursion is wrong.'
  },
  'dsa-trees': {
    module: 'DSA 03',
    title: 'Trees & BSTs',
    description: 'A binary search tree keeps values ordered: every left child is smaller than its parent, every right child is larger. That ordering is what makes search, insert, and delete O(log n) on a balanced tree.',
    codeExample: `// In-order traversal visits a BST in sorted order
function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
  return out;
}`,
    quiz: {
      question: 'In a binary search tree, the left child is always ___ its parent.',
      code: 'node.left.value ? node.value',
      options: ['greater than', 'equal to', 'less than', 'unrelated to'],
      correctAnswer: 2
    },
    tip: 'In-order traversal of a BST always returns the values sorted — a handy correctness check.'
  },
  'dsa-sorting': {
    module: 'DSA 04',
    title: 'Sorting Algorithms',
    description: 'Sorting is where Big-O becomes real. Simple sorts like bubble sort are O(n²); divide-and-conquer sorts like merge sort are O(n log n). Knowing the difference tells you when a solution will scale.',
    codeExample: `// Merge sort: divide, sort halves, merge — O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
    quiz: {
      question: 'What is the average time complexity of merge sort?',
      code: 'mergeSort(arr);',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 1
    },
    tip: 'If a nested loop makes it O(n²), a divide-and-conquer approach often gets you to O(n log n).'
  },
  'dsa-graphs': {
    module: 'DSA 05',
    title: 'Graphs: BFS & DFS',
    description: 'Graphs model connections — maps, networks, dependencies. BFS explores level by level using a queue (great for shortest paths); DFS goes deep first using a stack or recursion.',
    codeExample: `// Breadth-first search uses a queue
function bfs(graph, start) {
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    for (const next of graph[node]) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return [...seen];
}`,
    quiz: {
      question: 'Breadth-first search explores a graph using a ___.',
      code: 'queue.shift();',
      options: ['stack', 'queue', 'tree', 'heap'],
      correctAnswer: 1
    },
    tip: 'BFS = queue = shortest path in an unweighted graph. DFS = stack/recursion = go deep first.'
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
