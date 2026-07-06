import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Globe, 
  Shield, 
  Palette, 
  Volume2,
  ChevronRight,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { demoUser } from '../data/demo-data';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 max-w-4xl mx-auto"
    >
      <section>
        <h2 className="text-5xl font-bold tracking-tight mb-2">Settings</h2>
        <p className="text-lg text-on-surface-variant">Customize your learning experience</p>
      </section>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <User className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">Profile</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer">
              <div>
                <p className="font-bold">{demoUser.name}</p>
                <p className="text-sm text-on-surface-variant">{demoUser.email}</p>
              </div>
              <ChevronRight className="text-on-surface-variant" size={20} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <Bell className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10">
              <div>
                <p className="font-bold">Push Notifications</p>
                <p className="text-sm text-on-surface-variant">Get notified about your progress</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-14 h-8 rounded-full transition-all ${notifications ? 'bg-primary' : 'bg-surface-container'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-all ${notifications ? 'ml-7' : 'ml-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="text-primary" size={24} />
            <h3 className="text-2xl font-bold">Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/50 border border-outline-variant/10">
              <div>
                <p className="font-bold">Theme</p>
                <p className="text-sm text-on-surface-variant">{theme === 'dark' ? 'Dark mode' : 'Light mode'}</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="w-14 h-8 rounded-full bg-surface-container flex items-center px-1 transition-all hover:bg-surface-container-high"
              >
                <div className={`w-6 h-6 rounded-full bg-primary flex items-center justify-center transition-all ${theme === 'light' ? 'ml-6' : 'ml-0'}`}>
                  {theme === 'dark' ? <Moon size={14} className="text-surface" /> : <Sun size={14} className="text-surface" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full glass-card rounded-3xl p-6 flex items-center justify-center gap-3 text-error hover:bg-error/10 transition-all">
          <LogOut size={20} />
          <span className="font-bold">Log Out</span>
        </button>
      </div>
    </motion.div>
  );
}
