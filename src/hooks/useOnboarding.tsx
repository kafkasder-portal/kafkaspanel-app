import { useState, useCallback, useEffect } from 'react';

export interface OnboardingProgress {
  completedSteps: number;
  totalSteps: number;
  currentStep: number;
  lastCompletedAt?: Date;
}

export interface OnboardingState {
  isCompleted: boolean;
  isActive: boolean;
  progress: OnboardingProgress;
  userId?: string;
}

export interface UseOnboardingReturn {
  isOnboardingCompleted: boolean;
  isOnboardingActive: boolean;
  onboardingProgress: OnboardingProgress | null;
  startOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateProgress: (step: number, totalSteps: number) => void;
  skipOnboarding: () => void;
}

const ONBOARDING_STORAGE_KEY = 'nis-onboarding-state';
const DEFAULT_TOTAL_STEPS = 4;

export const useOnboarding = (userId?: string): UseOnboardingReturn => {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(() => {
    // Load from localStorage on initialization
    try {
      const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          isCompleted: parsed.isCompleted || false,
          isActive: false, // Always start as inactive
          progress: {
            completedSteps: parsed.progress?.completedSteps || 0,
            totalSteps: parsed.progress?.totalSteps || DEFAULT_TOTAL_STEPS,
            currentStep: parsed.progress?.currentStep || 0,
            lastCompletedAt: parsed.progress?.lastCompletedAt 
              ? new Date(parsed.progress.lastCompletedAt)
              : undefined
          },
          userId: parsed.userId
        };
      }
    } catch (error) {
      console.error('Failed to load onboarding state:', error);
    }
    
    return {
      isCompleted: false,
      isActive: false,
      progress: {
        completedSteps: 0,
        totalSteps: DEFAULT_TOTAL_STEPS,
        currentStep: 0
      },
      userId
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify({
        isCompleted: onboardingState.isCompleted,
        progress: {
          ...onboardingState.progress,
          lastCompletedAt: onboardingState.progress.lastCompletedAt?.toISOString()
        },
        userId: onboardingState.userId
      }));
    } catch (error) {
      console.error('Failed to save onboarding state:', error);
    }
  }, [onboardingState]);

  const startOnboarding = useCallback(() => {
    setOnboardingState(prev => ({
      ...prev,
      isActive: true,
      progress: {
        ...prev.progress,
        currentStep: 0
      }
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: true,
      isActive: false,
      progress: {
        ...prev.progress,
        completedSteps: prev.progress.totalSteps,
        currentStep: prev.progress.totalSteps,
        lastCompletedAt: new Date()
      }
    }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: false,
      isActive: false,
      progress: {
        completedSteps: 0,
        totalSteps: prev.progress.totalSteps,
        currentStep: 0,
        lastCompletedAt: undefined
      }
    }));
  }, []);

  const updateProgress = useCallback((step: number, totalSteps: number = DEFAULT_TOTAL_STEPS) => {
    setOnboardingState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        currentStep: step,
        completedSteps: Math.max(prev.progress.completedSteps, step),
        totalSteps
      }
    }));
  }, []);

  const skipOnboarding = useCallback(() => {
    setOnboardingState(prev => ({
      ...prev,
      isCompleted: true,
      isActive: false,
      progress: {
        ...prev.progress,
        completedSteps: 0, // Mark as skipped, not completed
        currentStep: 0,
        lastCompletedAt: new Date()
      }
    }));
  }, []);

  return {
    isOnboardingCompleted: onboardingState.isCompleted,
    isOnboardingActive: onboardingState.isActive,
    onboardingProgress: onboardingState.progress,
    startOnboarding,
    completeOnboarding,
    resetOnboarding,
    updateProgress,
    skipOnboarding
  };
};

// Helper hook for checking if user should see onboarding
export const useShouldShowOnboarding = (userId?: string): boolean => {
  const { isOnboardingCompleted } = useOnboarding(userId);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Show onboarding for new users or if not completed
    const hasSeenOnboarding = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    setShouldShow(!isOnboardingCompleted && !hasSeenOnboarding);
  }, [isOnboardingCompleted]);

  return shouldShow;
};

// Helper hook for onboarding analytics
export const useOnboardingAnalytics = () => {
  const trackOnboardingStart = useCallback((userId?: string) => {
    // Track onboarding start event
    console.log('Onboarding started', { userId, timestamp: new Date() });
    // Add your analytics tracking here
  }, []);

  const trackOnboardingComplete = useCallback((userId?: string, duration?: number) => {
    // Track onboarding completion event
    console.log('Onboarding completed', { userId, duration, timestamp: new Date() });
    // Add your analytics tracking here
  }, []);

  const trackOnboardingSkip = useCallback((userId?: string, step?: number) => {
    // Track onboarding skip event
    console.log('Onboarding skipped', { userId, step, timestamp: new Date() });
    // Add your analytics tracking here
  }, []);

  const trackOnboardingStep = useCallback((userId?: string, step: number, stepName?: string) => {
    // Track onboarding step completion
    console.log('Onboarding step completed', { userId, step, stepName, timestamp: new Date() });
    // Add your analytics tracking here
  }, []);

  return {
    trackOnboardingStart,
    trackOnboardingComplete,
    trackOnboardingSkip,
    trackOnboardingStep
  };
};

export default useOnboarding;