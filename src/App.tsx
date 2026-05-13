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
import { ScreenType } from './types';

export default function App() {
  const [activeScreen, setScreen] = useState<ScreenType>('landing');
  const [isAIExpanded, setAIExpanded] = useState(false);
  const [appReady, setAppReady] = useState(false);

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
        return <DashboardScreen />;
      case 'library':
        return <LibraryScreen onSelectModule={() => setScreen('lesson')} />;
      case 'lesson':
        return <LessonScreen onStartCoding={() => setScreen('coding')} />;
      case 'coding':
        return <CodingScreen onBack={() => setScreen('lesson')} />;
      case 'review':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
            <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-8 border border-primary/20">
              <span className="text-4xl font-bold">12</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Peer Reviews & Contributions</h2>
            <p className="text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
              Miguel, you have 12 pending pull requests to review from your cohort. Contributing to others' code is the fastest way to mastery.
            </p>
            <button 
              onClick={() => setScreen('coding')}
              className="px-10 py-4 bg-primary text-surface font-bold rounded-2xl active-glow"
            >
              Start Reviewing
            </button>
          </div>
        );
      case 'progress':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
            <h2 className="text-4xl font-bold mb-4">Learning Analytics</h2>
            <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">
              Your "Time-to-Code" velocity has improved by <span className="text-secondary font-bold">22%</span> this week. Keep up the momentum!
            </p>
          </div>
        );
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
