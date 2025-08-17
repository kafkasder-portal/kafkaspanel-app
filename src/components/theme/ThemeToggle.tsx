/**
 * Theme Toggle Component
 * TypeScript best practices ile tema değiştirici
 */

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAnimation } from '@/hooks/useAnimation';

interface ThemeToggleProps {
  readonly className?: string;
  readonly showLabel?: boolean;
  readonly variant?: 'icon' | 'button' | 'dropdown';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  variant = 'icon'
}) => {
  const { config, isDark, setMode, toggleMode } = useTheme();
  const [iconRef, { animate }] = useAnimation<HTMLDivElement>();

  const handleToggle = async () => {
    await animate('rotateIn', { duration: 300 });
    toggleMode();
  };

  const handleModeSelect = async (mode: 'light' | 'dark' | 'system') => {
    await animate('scaleIn', { duration: 200 });
    setMode(mode);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={`touch-target p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
        aria-label="Toggle theme"
      >
        <div ref={iconRef} className="w-5 h-5">
          {isDark ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      >
        <div ref={iconRef} className="w-5 h-5">
          {isDark ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        {showLabel && (
          <span className="text-gray-700 dark:text-gray-300">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Theme selector"
      >
        <div ref={iconRef} className="w-5 h-5">
          {config.mode === 'system' ? (
            <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : isDark ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        {showLabel && (
          <span className="text-gray-700 dark:text-gray-300">
            {config.mode === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </button>

      <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
        <button
          onClick={() => handleModeSelect('light')}
          className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            config.mode === 'light' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </button>
        <button
          onClick={() => handleModeSelect('dark')}
          className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            config.mode === 'dark' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </button>
        <button
          onClick={() => handleModeSelect('system')}
          className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            config.mode === 'system' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </button>
      </div>
    </div>
  );
};
