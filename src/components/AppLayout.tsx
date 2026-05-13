import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  RotateCcw, 
  TrendingUp, 
  Settings, 
  HelpCircle,
  Gem,
  Bell,
  Search,
  Flame,
  Milestone,
  MessageSquare,
  History,
  Paperclip,
  MoreVertical,
  X,
  Send,
  Zap,
  Menu,
  Bot,
  User,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenType } from '../types';
import { askMentor } from '../services/geminiService';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  isAIExpanded: boolean;
  setAIExpanded: (expanded: boolean) => void;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AppLayout({ children, activeScreen, setScreen, isAIExpanded, setAIExpanded }: LayoutProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Welcome back Gaille! I see you were exploring array iteration last night. Ready to tackle .reduce() today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'library', icon: Library, label: 'Library' },
    { id: 'review', icon: RotateCcw, label: 'Review' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await askMentor(userMsg, `User is currently on ${activeScreen} screen.`);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (activeScreen === 'landing' || activeScreen === 'onboarding') {
    return <div className="min-h-screen gradient-mesh">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[260px] bg-surface-container border-r border-outline-variant/10 flex flex-col py-8 px-4 z-50">
        <div className="mb-12 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-surface font-bold text-xl">C</div>
          <div>
            <h1 className="font-bold text-primary text-xl leading-tight">Codemm</h1>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Pro Learning</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as ScreenType)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeScreen === item.id 
                ? 'bg-primary/10 text-primary border-r-2 border-primary active-glow' 
                : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <item.icon size={22} strokeWidth={activeScreen === item.id ? 2.5 : 2} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-outline-variant/10">
          <div className="space-y-1">
            <button 
              onClick={() => setScreen('settings')}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl transition-all ${
                activeScreen === 'settings' 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <Settings size={20} />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button 
              onClick={() => setScreen('support')}
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl transition-all ${
                activeScreen === 'support' 
                ? 'bg-primary/10 text-primary' 
                : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <HelpCircle size={20} />
              <span className="text-sm font-medium">Support</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header className="fixed top-0 right-0 left-[260px] h-16 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-8 z-40">
        <div className="flex-1 max-w-md relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Search modules, code, logic..."
            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high transition-all flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} className="text-on-surface-variant" /> : <Moon size={20} className="text-on-surface-variant" />}
          </button>
          
          <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
            <div className="flex items-center gap-1 text-error">
              <Flame size={20} fill="currentColor" stroke="none" className="animate-pulse" />
              <span className="text-sm font-bold">5</span>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <Milestone size={20} />
              <span className="text-sm font-bold">Lvl 12</span>
            </div>
          </div>

          <button className="flex items-center gap-3 group">
            <div className="text-right">
              <p className="text-xs font-bold leading-tight">Gaille Ivan Anoos</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`pt-24 pb-12 transition-all duration-500 pr-8 ${isAIExpanded ? 'pl-[284px] pr-[354px]' : 'pl-[284px]'}`}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>

      {/* AI Mentor Side Drawer */}
      <aside className={`fixed right-0 top-16 h-[calc(100vh-64px)] bg-surface-container-high/80 backdrop-blur-2xl border-l border-outline-variant/10 shadow-2xl transition-all duration-500 ease-in-out flex flex-col z-30 ${isAIExpanded ? 'w-[320px] translate-x-0' : 'w-0 translate-x-full'}`}>
        <div className="p-6 flex-1 flex flex-col overflow-hidden min-w-[320px]">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-tertiary flex items-center gap-2">
              <Zap size={20} fill="currentColor" stroke="none" /> AI Mentor
            </h3>
            <p className="text-xs text-on-surface-variant">Real-time debugging & guidance</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-6 custom-scrollbar pr-2">
            {messages.map((msg, i) => (
              <div key={i} className={`p-4 rounded-2xl ${msg.role === 'ai' ? 'bg-surface-container-highest rounded-tl-none' : 'bg-primary/10 border border-primary/20 rounded-tr-none ml-8 text-right'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="p-4 bg-surface-container-highest rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-tertiary/10 text-tertiary font-bold transition-all text-sm">
              <Bot size={18} /> AI Tutor
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 transition-all text-sm">
              <History size={18} /> Session History
            </button>
          </div>

          <div className="mt-auto relative">
            <input 
              type="text" 
              placeholder="Ask mentor..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:border-tertiary transition-all"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:scale-110 transition-transform"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* AI Trigger Tab */}
      {!isAIExpanded && (
        <button 
          onClick={() => setAIExpanded(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-surface-container-high border border-outline-variant/10 p-2 rounded-l-xl text-tertiary hover:bg-tertiary hover:text-surface transition-all z-20"
        >
          <Zap size={20} fill="currentColor" stroke="none" />
        </button>
      )}
      {isAIExpanded && (
        <button 
          onClick={() => setAIExpanded(false)}
          className="fixed right-[320px] top-1/2 -translate-y-1/2 bg-surface-container-high border border-outline-variant/10 p-2 rounded-l-xl text-on-surface-variant hover:text-on-surface transition-all z-20"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
