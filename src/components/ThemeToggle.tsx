'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-1">
      <button
        onClick={() => handleThemeChange('light')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'light'
            ? 'bg-card text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange('dark')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'dark'
            ? 'bg-card text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleThemeChange('system')}
        className={`rounded-full p-1.5 transition-all ${
          theme === 'system'
            ? 'bg-card text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="System Preference"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
