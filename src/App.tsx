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
import { ScreenType } from './types';

export default function App() {
  const [activeScreen, setScreen] = useState<ScreenType>('landing');
  const [isAIExpanded, setAIExpanded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');

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
        return <OnboardingScreen onComplete={() => setScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen 
          onResumeLesson={() => { setSelectedModuleId('js-fundamentals'); setScreen('lesson'); }}
          onViewSyllabus={() => setScreen('syllabus')}
        />;
      case 'library':
        return <LibraryScreen onSelectModule={(id) => { setSelectedModuleId(id); setScreen('lesson'); }} />;
      case 'lesson':
        return <LessonScreen moduleId={selectedModuleId} onStartCoding={() => setScreen('coding')} />;
      case 'coding':
        return <CodingScreen onBack={() => setScreen('lesson')} />;
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
    >
      {renderContent()}
    </AppLayout>
  );
}
