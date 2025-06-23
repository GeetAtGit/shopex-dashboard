// src/pages/Settings.jsx
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function Settings() {
  // Initialize from localStorage or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // When theme changes, update <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen p-6 bg-bg text-fg transition-colors">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* Dark / Light Mode Toggle */}
      <div className="flex items-center space-x-3 mb-8">
        <FaSun className="text-yellow-400" aria-hidden="true" />
        <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
          <input
            id="theme-toggle"
            type="checkbox"
            className="sr-only peer"
            checked={theme === 'dark'}
            onChange={toggle}
          />
          <div className="
            w-12 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-offset-2
            peer-focus:ring-primary rounded-full peer peer-checked:bg-secondary
            transition-colors
          " />
          <div className="
            absolute left-1 top-1 bg-white w-4 h-4 rounded-full
            transition-transform peer-checked:translate-x-6
          " />
        </label>
        <FaMoon className="text-gray-600 dark:text-gray-300" aria-hidden="true" />
        <span className="sr-only">Toggle dark mode</span>
      </div>
    </div>
  );
}
