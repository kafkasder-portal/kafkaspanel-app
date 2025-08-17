import { useState, useEffect, useCallback, useMemo } from "react"

// Local storage with error handling
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silent fail for quota exceeded or other errors
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};

// Type definitions
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeAccent = 'blue' | 'green' | 'purple' | 'orange' | 'red';

interface ThemeConfig {
  mode: ThemeMode;
  accent: ThemeAccent;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  highContrast: boolean;
}

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

// Simple theme manager
class SimpleThemeManager {
  public config: ThemeConfig = {
    mode: 'system',
    accent: 'blue',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false
  };

  private listeners: Set<(config: ThemeConfig) => void> = new Set();

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const saved = safeLocalStorage.getItem('themeConfig');
    if (saved) {
      try {
        this.config = { ...this.config, ...JSON.parse(saved) };
      } catch {
        // Use default config
      }
    }
  }

  private saveConfig() {
    safeLocalStorage.setItem('themeConfig', JSON.stringify(this.config));
  }

  subscribe(callback: (config: ThemeConfig) => void) {
    this.listeners.add(callback);
    callback(this.config);
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach(callback => callback(this.config));
  }

  setMode(mode: ThemeMode) {
    this.config.mode = mode;
    this.saveConfig();
    this.notify();
    this.applyTheme();
  }

  toggleMode() {
    const newMode = this.config.mode === 'dark' ? 'light' : 'dark';
    this.setMode(newMode);
  }

  setAccent(accent: ThemeAccent) {
    this.config.accent = accent;
    this.saveConfig();
    this.notify();
  }

  setFontSize(size: 'small' | 'medium' | 'large') {
    this.config.fontSize = size;
    this.saveConfig();
    this.notify();
  }

  setReducedMotion(reduced: boolean) {
    this.config.reducedMotion = reduced;
    this.saveConfig();
    this.notify();
  }

  setHighContrast(contrast: boolean) {
    this.config.highContrast = contrast;
    this.saveConfig();
    this.notify();
  }

  getColors(): ThemeColors {
    const isDark = this.isDarkMode();
    return {
      background: isDark ? '#0f0f23' : '#ffffff',
      surface: isDark ? '#1a1a2e' : '#f8f9fa',
      text: isDark ? '#ffffff' : '#000000',
      textSecondary: isDark ? '#a0a0a0' : '#666666',
      primary: '#3b82f6',
      border: isDark ? '#2d2d44' : '#e5e7eb',
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
      info: '#3b82f6'
    };
  }

  isDarkMode(): boolean {
    if (this.config.mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return this.config.mode === 'dark';
  }

  private applyTheme() {
    const isDark = this.isDarkMode();
    document.documentElement.classList.toggle('dark', isDark);
  }
}

const themeManager = new SimpleThemeManager();

export function useTheme() {
  const [config, setConfig] = useState<ThemeConfig>(themeManager.config);
  const [colors, setColors] = useState<ThemeColors>(themeManager.getColors());
  const [isDark, setIsDark] = useState<boolean>(themeManager.isDarkMode());

  // Subscribe to theme changes
  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newConfig) => {
      setConfig(newConfig);
      setColors(themeManager.getColors());
      setIsDark(themeManager.isDarkMode());
    });

    return unsubscribe;
  }, []);

  // Actions
  const setMode = useCallback((mode: ThemeMode) => {
    themeManager.setMode(mode);
  }, []);

  const toggleMode = useCallback(() => {
    themeManager.toggleMode();
  }, []);

  const setAccent = useCallback((accent: ThemeAccent) => {
    themeManager.setAccent(accent);
  }, []);

  const setFontSize = useCallback((size: 'small' | 'medium' | 'large') => {
    themeManager.setFontSize(size);
  }, []);

  const setReducedMotion = useCallback((reduced: boolean) => {
    themeManager.setReducedMotion(reduced);
  }, []);

  const setHighContrast = useCallback((contrast: boolean) => {
    themeManager.setHighContrast(contrast);
  }, []);

  // Memoized state
  const state = useMemo(() => ({
    config,
    colors,
    isDark
  }), [config, colors, isDark]);

  // Memoized actions
  const actions = useMemo(() => ({
    setMode,
    toggleMode,
    setAccent,
    setFontSize,
    setReducedMotion,
    setHighContrast
  }), [
    setMode,
    toggleMode,
    setAccent,
    setFontSize,
    setReducedMotion,
    setHighContrast
  ]);

  return { ...state, ...actions };
}

// Hook for theme-aware styles
export function useThemeStyles() {
  const { colors, isDark } = useTheme();

  const styles = useMemo(() => ({
    // Layout styles
    container: {
      backgroundColor: colors.background,
      color: colors.text
    },
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.border
    },
    
    // Text styles
    text: {
      color: colors.text
    },
    textSecondary: {
      color: colors.textSecondary
    },
    
    // Button styles
    buttonPrimary: {
      backgroundColor: colors.primary,
      color: isDark ? colors.background : '#FFFFFF',
      border: 'none'
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`
    },
    buttonGhost: {
      backgroundColor: 'transparent',
      color: colors.text,
      border: `1px solid ${colors.border}`
    },
    
    // Card styles
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      boxShadow: isDark 
        ? '0 4px 6px rgba(0, 0, 0, 0.5)' 
        : '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    
    // Input styles
    input: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.text
    },
    inputFocus: {
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primary}33`
    },
    
    // Status styles
    error: {
      color: colors.error,
      backgroundColor: `${colors.error}15`,
      borderColor: colors.error
    },
    warning: {
      color: colors.warning,
      backgroundColor: `${colors.warning}15`,
      borderColor: colors.warning
    },
    success: {
      color: colors.success,
      backgroundColor: `${colors.success}15`,
      borderColor: colors.success
    },
    info: {
      color: colors.info,
      backgroundColor: `${colors.info}15`,
      borderColor: colors.info
    }
  }), [colors, isDark]);

  return styles;
}

// Hook for theme class names
export function useThemeClasses() {
  const { isDark, config } = useTheme();

  const classes = useMemo(() => ({
    // Base classes
    theme: isDark ? 'dark' : 'light',
    
    // Typography classes
    fontSize: `text-${config.fontSize}`,
    
    // Accessibility classes
    reducedMotion: config.reducedMotion ? 'reduced-motion' : '',
    highContrast: config.highContrast ? 'high-contrast' : '',
    
    // Combined
    root: [
      isDark ? 'dark' : 'light',
      `text-${config.fontSize}`,
      config.reducedMotion ? 'reduced-motion' : '',
      config.highContrast ? 'high-contrast' : ''
    ].filter(Boolean).join(' ')
  }), [isDark, config]);

  return classes;
}
