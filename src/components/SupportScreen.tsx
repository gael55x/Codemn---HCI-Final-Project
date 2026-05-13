import React from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, 
  Mail, 
  BookOpen, 
  HelpCircle,
  ExternalLink,
  Send
} from 'lucide-react';

export default function SupportScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 max-w-4xl mx-auto"
    >
      <section>
        <h2 className="text-5xl font-bold tracking-tight mb-2">Support</h2>
        <p className="text-lg text-on-surface-variant">We're here to help you succeed</p>
      </section>

      <div className="space-y-6">
        {/* Contact Options */}
        <div className="grid grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-8 hover:border-primary/30 transition-all cursor-pointer border border-outline-variant/10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <MessageCircle className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Live Chat</h3>
            <p className="text-sm text-on-surface-variant mb-6">Get instant help from our support team</p>
            <button className="text-primary font-bold text-sm flex items-center gap-2">
              Start Chat
              <ExternalLink size={16} />
            </button>
          </div>

          <div className="glass-card rounded-3xl p-8 hover:border-primary/30 transition-all cursor-pointer border border-outline-variant/10">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
              <Mail className="text-secondary" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Email Support</h3>
            <p className="text-sm text-on-surface-variant mb-6">Send us a detailed message</p>
            <button className="text-secondary font-bold text-sm flex items-center gap-2">
              Send Email
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <HelpCircle className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do I reset my password?', a: 'Go to Settings > Profile and click "Change Password"' },
              { q: 'Can I change my learning path?', a: 'Yes, visit the Library to explore different modules' },
              { q: 'How does the streak system work?', a: 'Complete at least one lesson daily to maintain your streak' },
              { q: 'What is Premium Access?', a: 'Premium unlocks AI mentoring, priority support, and advanced features' }
            ].map((faq, i) => (
              <details key={i} className="p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer">
                <summary className="font-bold cursor-pointer">{faq.q}</summary>
                <p className="text-sm text-on-surface-variant mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">Documentation</h3>
          </div>
          <div className="space-y-4">
            <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 hover:border-primary/30 transition-all">
              <span className="font-bold">Getting Started Guide</span>
              <ExternalLink className="text-on-surface-variant" size={20} />
            </a>
            <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 hover:border-primary/30 transition-all">
              <span className="font-bold">Learning Tips & Best Practices</span>
              <ExternalLink className="text-on-surface-variant" size={20} />
            </a>
            <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 hover:border-primary/30 transition-all">
              <span className="font-bold">Community Guidelines</span>
              <ExternalLink className="text-on-surface-variant" size={20} />
            </a>
          </div>
        </div>

        {/* Feedback */}
        <div className="glass-card rounded-3xl p-8 border border-tertiary/20 bg-gradient-to-br from-tertiary/5 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <Send className="text-tertiary" size={24} />
            <h3 className="text-2xl font-bold">Send Feedback</h3>
          </div>
          <p className="text-on-surface-variant mb-6">Help us improve your learning experience</p>
          <textarea 
            className="w-full p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 focus:border-tertiary/50 outline-none resize-none"
            rows={4}
            placeholder="Share your thoughts, suggestions, or report issues..."
          />
          <button className="mt-4 px-8 py-3 bg-tertiary text-surface font-bold rounded-xl hover:brightness-110 transition-all">
            Submit Feedback
          </button>
        </div>
      </div>
    </motion.div>
  );
}
