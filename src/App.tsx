/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import LandingScreen from './components/LandingScreen';
import OnboardingScreen from './components/OnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import LessonScreen from './components/LessonScreen';
import LibraryScreen from './components/LibraryScreen';
import CodingScreen from './components/CodingScreen';
import SettingsScreen from './components/SettingsScreen';
import SupportScreen from './components/SupportScreen';
import SyllabusScreen from './components/SyllabusScreen';
import ProgressScreen from './components/ProgressScreen';
import ReviewScreen from './components/ReviewScreen';
import { ScreenType, UserPreferences } from './types';
import { askMentor } from './services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function App() {
  const [activeScreen, setScreen] = useState<ScreenType>('landing');
  const [isAIExpanded, setAIExpanded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');

  // Lifted AI Mentor State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Welcome back Gaille! I see you were exploring array iteration last night. Ready to tackle .reduce() today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // User Preferences State
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : { level: null, path: null, goal: null, time: null };
  });

  const handleAskMentor = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setAIExpanded(true);
    setIsTyping(true);

    try {
      const response = await askMentor(text, `User is currently on ${activeScreen} screen.`);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCompleteOnboarding = (prefs: UserPreferences) => {
    setUserPreferences(prefs);
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
    setScreen('dashboard');
  };

  useEffect(() => {
    // Initial data loading simulation
    const timer = setTimeout(() => setAppReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!appReady) return null;

  const renderContent = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingScreen onStart={() => setScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
      case 'dashboard':
        return <DashboardScreen 
          userPreferences={userPreferences}
          onResumeLesson={() => { setSelectedModuleId('js-fundamentals'); setScreen('lesson'); }}
          onViewSyllabus={() => setScreen('syllabus')}
        />;
      case 'library':
        return <LibraryScreen onSelectModule={(id) => { setSelectedModuleId(id); setScreen('lesson'); }} />;
      case 'lesson':
        return <LessonScreen 
          moduleId={selectedModuleId} 
          onStartCoding={() => setScreen('coding')}
          onAskAI={handleAskMentor}
        />;
      case 'coding':
        return <CodingScreen 
          onBack={() => setScreen('lesson')} 
          onAskAI={handleAskMentor}
        />;
      case 'review':
        return <ReviewScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'support':
        return <SupportScreen />;
      case 'syllabus':
        return <SyllabusScreen onBack={() => setScreen('dashboard')} />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-on-surface-variant opacity-40">Section Under Recalibration...</p>
          </div>
        );
    }
  };

  return (
    <AppLayout 
      activeScreen={activeScreen} 
      setScreen={setScreen}
      isAIExpanded={isAIExpanded}
      setAIExpanded={setAIExpanded}
      messages={messages}
      setMessages={setMessages}
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      onSendMessage={handleAskMentor}
    >
      {renderContent()}
    </AppLayout>
  );
}

