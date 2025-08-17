/**
 * Theme Hook
 * TypeScript best practices ile tema yönetimi hook'u
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  themeManager, 
  type ThemeConfig, 
  type ThemeColors,
  type ThemeMode,
  type ThemeAccent
} from '@/lib/theme/themeManager';

interface ThemeState {
  readonly config: ThemeConfig;
  readonly colors: ThemeColors;
  readonly isDark: boolean;
}

interface ThemeActions {
  readonly setMode: (mode: ThemeMode) => void;
  readonly toggleMode: () => void;
  readonly setAccent: (accent: ThemeAccent) => void;
  readonly setFontSize: (size: 'small' | 'medium' | 'large') => void;
  readonly setReducedMotion: (reduced: boolean) => void;
  readonly setHighContrast: (contrast: boolean) => void;
}

export function useTheme(): ThemeState & ThemeActions {
  const [config, setConfig] = useState<ThemeConfig>(themeManager.getConfig());
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
