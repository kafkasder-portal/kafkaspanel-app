/**
 * Theme Manager
 * TypeScript best practices ile tema yönetimi
 */

// Types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeAccent = 'blue' | 'purple' | 'green' | 'red' | 'orange';

export interface ThemeConfig {
  readonly mode: ThemeMode;
  readonly accent: ThemeAccent;
  readonly fontSize: 'small' | 'medium' | 'large';
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
}

export interface ThemeColors {
  readonly primary: string;
  readonly secondary: string;
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly textSecondary: string;
  readonly border: string;
  readonly error: string;
  readonly warning: string;
  readonly success: string;
  readonly info: string;
}

// Theme presets
const LIGHT_THEME: ThemeColors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
  info: '#3B82F6'
};

const DARK_THEME: ThemeColors = {
  primary: '#60A5FA',
  secondary: '#A78BFA',
  background: '#0F172A',
  surface: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  error: '#F87171',
  warning: '#FBBF24',
  success: '#34D399',
  info: '#60A5FA'
};

// Accent color palettes
const ACCENT_COLORS: Record<ThemeAccent, { light: string; dark: string }> = {
  blue: { light: '#3B82F6', dark: '#60A5FA' },
  purple: { light: '#8B5CF6', dark: '#A78BFA' },
  green: { light: '#10B981', dark: '#34D399' },
  red: { light: '#EF4444', dark: '#F87171' },
  orange: { light: '#F59E0B', dark: '#FBBF24' }
};

export class ThemeManager {
  private static instance: ThemeManager;
  private config: ThemeConfig;
  private listeners: Set<(config: ThemeConfig) => void> = new Set();
  private mediaQuery: MediaQueryList | null = null;

  private constructor() {
    this.config = this.loadConfig();
    this.setupSystemThemeListener();
    this.applyTheme();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * Get current theme configuration
   */
  getConfig(): ThemeConfig {
    return { ...this.config };
  }

  /**
   * Get current theme colors
   */
  getColors(): ThemeColors {
    const isDark = this.isDarkMode();
    const baseTheme = isDark ? DARK_THEME : LIGHT_THEME;
    const accentColor = ACCENT_COLORS[this.config.accent];
    
    return {
      ...baseTheme,
      primary: isDark ? accentColor.dark : accentColor.light
    };
  }

  /**
   * Set theme mode
   */
  setMode(mode: ThemeMode): void {
    this.updateConfig({ mode });
  }

  /**
   * Set accent color
   */
  setAccent(accent: ThemeAccent): void {
    this.updateConfig({ accent });
  }

  /**
   * Set font size
   */
  setFontSize(fontSize: 'small' | 'medium' | 'large'): void {
    this.updateConfig({ fontSize });
  }

  /**
   * Toggle reduced motion
   */
  setReducedMotion(reducedMotion: boolean): void {
    this.updateConfig({ reducedMotion });
  }

  /**
   * Toggle high contrast
   */
  setHighContrast(highContrast: boolean): void {
    this.updateConfig({ highContrast });
  }

  /**
   * Check if dark mode is active
   */
  isDarkMode(): boolean {
    if (this.config.mode === 'system') {
      return this.mediaQuery?.matches ?? false;
    }
    return this.config.mode === 'dark';
  }

  /**
   * Toggle between light and dark mode
   */
  toggleMode(): void {
    const newMode = this.isDarkMode() ? 'light' : 'dark';
    this.setMode(newMode);
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (config: ThemeConfig) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Apply theme to DOM
   */
  private applyTheme(): void {
    const root = document.documentElement;
    const isDark = this.isDarkMode();
    const colors = this.getColors();

    // Apply theme mode
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');

    // Apply CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    root.style.setProperty('--font-size-base', fontSizes[this.config.fontSize]);

    // Apply accessibility settings
    root.classList.toggle('reduced-motion', this.config.reducedMotion);
    root.classList.toggle('high-contrast', this.config.highContrast);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', colors.primary);
    }
  }

  /**
   * Update configuration
   */
  private updateConfig(partial: Partial<ThemeConfig>): void {
    this.config = { ...this.config, ...partial };
    this.saveConfig();
    this.applyTheme();
    this.notifyListeners();
  }

  /**
   * Load configuration from storage
   */
  private loadConfig(): ThemeConfig {
    try {
      const stored = localStorage.getItem('themeConfig');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load theme config:', error);
    }

    return {
      mode: 'system',
      accent: 'blue',
      fontSize: 'medium',
      reducedMotion: false,
      highContrast: false
    };
  }

  /**
   * Save configuration to storage
   */
  private saveConfig(): void {
    try {
      localStorage.setItem('themeConfig', JSON.stringify(this.config));
    } catch (error) {
      console.error('Failed to save theme config:', error);
    }
  }

  /**
   * Setup system theme listener
   */
  private setupSystemThemeListener(): void {
    if (typeof window === 'undefined') return;

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (this.config.mode === 'system') {
        this.applyTheme();
        this.notifyListeners();
      }
    };

    // Modern browsers
    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy browsers
      this.mediaQuery.addListener(handleChange);
    }

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches && !this.config.reducedMotion) {
      this.setReducedMotion(true);
    }

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    if (highContrastQuery.matches && !this.config.highContrast) {
      this.setHighContrast(true);
    }
  }

  /**
   * Notify listeners of changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getConfig()));
  }

  /**
   * Get CSS for current theme
   */
  getThemeCSS(): string {
    const colors = this.getColors();
    const isDark = this.isDarkMode();

    return `
      :root {
        --color-primary: ${colors.primary};
        --color-secondary: ${colors.secondary};
        --color-background: ${colors.background};
        --color-surface: ${colors.surface};
        --color-text: ${colors.text};
        --color-text-secondary: ${colors.textSecondary};
        --color-border: ${colors.border};
        --color-error: ${colors.error};
        --color-warning: ${colors.warning};
        --color-success: ${colors.success};
        --color-info: ${colors.info};
        
        --shadow-sm: ${isDark ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};
        --shadow-md: ${isDark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)'};
        --shadow-lg: ${isDark ? '0 10px 15px rgba(0, 0, 0, 0.5)' : '0 10px 15px rgba(0, 0, 0, 0.1)'};
      }

      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      .high-contrast {
        filter: contrast(1.2);
      }

      .high-contrast .text-secondary {
        opacity: 1 !important;
      }
    `;
  }
}

// Singleton instance
export const themeManager = ThemeManager.getInstance();
