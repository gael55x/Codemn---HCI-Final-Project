/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import LandingScreen from './components/LandingScreen';
import OnboardingScreen from './components/OnboardingScreen';
import DiagnosticScreen from './components/DiagnosticScreen';
import ResultsScreen from './components/ResultsScreen';
import DashboardScreen from './components/DashboardScreen';
import LessonScreen from './components/LessonScreen';
import LibraryScreen from './components/LibraryScreen';
import CodingScreen from './components/CodingScreen';
import SettingsScreen from './components/SettingsScreen';
import SyllabusScreen from './components/SyllabusScreen';
import ProgressScreen from './components/ProgressScreen';
import { ScreenType, UserPreferences } from './types';
import { askMentor } from './services/geminiService';
import { mentorWelcome, sampleDiagnosticResult, DiagnosticResult } from './data/demo-data';

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
    { role: 'ai', text: mentorWelcome }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // User Preferences State
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('userPreferences');
    return saved ? JSON.parse(saved) : { level: null, path: null, goal: null, time: null };
  });

  // Diagnostic result (falls back to a representative sample before a run)
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult>(() => {
    const saved = localStorage.getItem('diagnosticResult');
    return saved ? JSON.parse(saved) : sampleDiagnosticResult;
  });

  const handleCompleteDiagnostic = (result: DiagnosticResult) => {
    setDiagnosticResult(result);
    localStorage.setItem('diagnosticResult', JSON.stringify(result));
    setScreen('results');
  };

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
    setScreen('diagnostic');
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
      case 'diagnostic':
        return <DiagnosticScreen onComplete={handleCompleteDiagnostic} />;
      case 'results':
        return <ResultsScreen
          result={diagnosticResult}
          onStartPath={() => setScreen('dashboard')}
          onRetake={() => setScreen('diagnostic')}
        />;
      case 'dashboard':
        return <DashboardScreen
          userPreferences={userPreferences}
          diagnosticResult={diagnosticResult}
          onResumeLesson={() => { setSelectedModuleId('js-fundamentals'); setScreen('lesson'); }}
          onViewSyllabus={() => setScreen('syllabus')}
          onViewResults={() => setScreen('results')}
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
      case 'progress':
        return <ProgressScreen />;
      case 'settings':
        return <SettingsScreen />;
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

