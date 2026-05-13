import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ThumbsUp, 
  Award,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';

interface Submission {
  id: number;
  author: string;
  topic: string;
  code: string;
  expanded: boolean;
}

export default function ReviewScreen() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 482,
      author: 'Anonymous Learner #482',
      topic: 'REACT HOOKS/USESTATE-DEBOUNCE',
      code: `const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};`,
      expanded: true
    },
    {
      id: 961,
      author: 'Anonymous Learner #961',
      topic: 'ARRAYS-GROUPING-REDUCE',
      code: `// Click to expand and review this submission`,
      expanded: false
    }
  ]);

  const [ratings, setRatings] = useState({
    readability: 0,
    logic: 0,
    efficiency: 0
  });

  const [feedback, setFeedback] = useState('');

  const toggleExpand = (id: number) => {
    setSubmissions(submissions.map(sub => 
      sub.id === id ? { ...sub, expanded: !sub.expanded } : sub
    ));
  };

  const setRating = (category: 'readability' | 'logic' | 'efficiency', value: number) => {
    setRatings({ ...ratings, [category]: value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-bold tracking-tight mb-2">Community Review</h2>
          <p className="text-lg text-on-surface-variant">Gaille, could you help your peers?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-bold">4,258 XP</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
            <Award size={20} className="text-primary" />
            <span className="text-sm font-bold">12 Day Streak</span>
          </div>
        </div>
      </div>

      {/* Helper Rewards Banner */}
      <div className="glass-card rounded-3xl p-8 border-secondary/20 bg-gradient-to-r from-secondary/5 to-transparent relative overflow-hidden">
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <div className="text-right">
            <p className="text-xs text-on-surface-variant mb-1">Next Goal:</p>
            <p className="text-sm font-bold text-secondary">5/10 Reviews</p>
          </div>
          <div className="w-48 h-2 bg-surface-container rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-secondary" style={{ width: '50%' }} />
          </div>
        </div>
        <div className="flex items-center gap-6 max-w-2xl">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <ThumbsUp size={32} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Helper Rewards Active</h3>
            <p className="text-sm text-on-surface-variant">
              Earn 10 XP for every helpful review. Top contributors this week get a <span className="text-secondary font-bold">Code Mentor</span> badge.
            </p>
          </div>
        </div>
      </div>

      {/* Submissions */}
      <div className="space-y-6">
        {submissions.map((submission) => (
          <div 
            key={submission.id}
            className="glass-card rounded-3xl overflow-hidden border-outline-variant/10"
          >
            {/* Submission Header */}
            <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  AL
                </div>
                <div>
                  <h4 className="font-bold">{submission.author}</h4>
                  <p className="text-xs text-on-surface-variant font-mono">{submission.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">
                  Intermediate
                </button>
                <button className="px-4 py-2 text-xs font-bold text-secondary hover:bg-secondary/10 transition-colors rounded-lg">
                  TypeScript
                </button>
              </div>
            </div>

            {/* Code Section */}
            {submission.expanded ? (
              <div className="grid grid-cols-12 gap-6 p-6">
                {/* Code Display */}
                <div className="col-span-7">
                  <div className="bg-[#020b14] rounded-2xl overflow-hidden border border-outline-variant/10">
                    <div className="bg-surface-container-highest/30 px-6 py-3 border-b border-outline-variant/10 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-error/40" />
                      <div className="w-3 h-3 rounded-full bg-secondary/40" />
                      <div className="w-3 h-3 rounded-full bg-primary/40" />
                    </div>
                    <pre className="p-6 font-mono text-sm leading-relaxed text-on-surface overflow-x-auto">
                      {submission.code}
                    </pre>
                  </div>
                </div>

                {/* Rating Panel */}
                <div className="col-span-5 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">
                      Rate This Submission
                    </h4>

                    {/* Readability */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold">Readability</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating('readability', star)}
                              className={`w-8 h-8 rounded-lg transition-all ${
                                star <= ratings.readability
                                  ? 'bg-primary text-surface'
                                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                              }`}
                            >
                              <Star size={16} className="mx-auto" fill={star <= ratings.readability ? 'currentColor' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Logic */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold">Logic</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating('logic', star)}
                              className={`w-8 h-8 rounded-lg transition-all ${
                                star <= ratings.logic
                                  ? 'bg-primary text-surface'
                                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                              }`}
                            >
                              <Star size={16} className="mx-auto" fill={star <= ratings.logic ? 'currentColor' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Efficiency */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold">Efficiency</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating('efficiency', star)}
                              className={`w-8 h-8 rounded-lg transition-all ${
                                star <= ratings.efficiency
                                  ? 'bg-primary text-surface'
                                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                              }`}
                            >
                              <Star size={16} className="mx-auto" fill={star <= ratings.efficiency ? 'currentColor' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div>
                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-3 block">
                      Constructive Feedback
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Explain your rating..."
                      className="w-full h-32 p-4 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button className="w-full py-4 bg-primary text-surface font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    Submit Review
                    <ChevronUp size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => toggleExpand(submission.id)}
                className="w-full p-8 text-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/50 transition-all"
              >
                <p className="text-sm mb-2">Click to expand and review this submission</p>
                <ChevronDown size={20} className="mx-auto" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      <div className="glass-card rounded-3xl p-12 text-center border-dashed border-2 border-outline-variant/20">
        <div className="w-16 h-16 rounded-full bg-surface-container mx-auto mb-6 flex items-center justify-center">
          <Award size={32} className="text-on-surface-variant" />
        </div>
        <h3 className="text-xl font-bold mb-2">Great work!</h3>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto">
          You've reviewed all available submissions. Check back later for more opportunities to help your peers.
        </p>
      </div>
    </motion.div>
  );
}
