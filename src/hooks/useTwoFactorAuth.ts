/**
 * Two-Factor Authentication Hook
 * TypeScript best practices ile 2FA state management
 */

import { useState, useCallback, useMemo } from 'react';
import { 
  twoFactorAuthManager,
  type TwoFactorSetupData,
  type TwoFactorVerificationResult
} from '@/lib/security/twoFactorAuth';

// Types
interface TwoFactorState {
  readonly isLoading: boolean;
  readonly isEnabled: boolean;
  readonly setupData: TwoFactorSetupData | null;
  readonly status: {
    readonly enabled: boolean;
    readonly setupAt?: Date;
    readonly lastUsed?: Date;
    readonly remainingBackupCodes: number;
  };
  readonly error: string | null;
}

interface TwoFactorActions {
  readonly setupTwoFactor: (userId: string) => Promise<TwoFactorSetupData | null>;
  readonly completeTwoFactorSetup: (userId: string, verificationCode: string) => Promise<boolean>;
  readonly verifyTwoFactor: (userId: string, code: string, isBackupCode?: boolean) => Promise<TwoFactorVerificationResult>;
  readonly disableTwoFactor: (userId: string, verificationCode: string) => Promise<boolean>;
  readonly regenerateBackupCodes: (userId: string, verificationCode: string) => Promise<readonly string[]>;
  readonly refreshStatus: (userId: string) => void;
  readonly clearError: () => void;
}

export function useTwoFactorAuth(userId?: string): TwoFactorState & TwoFactorActions {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null);
  const [status, setStatus] = useState(() => 
    userId ? twoFactorAuthManager.getTwoFactorStatus(userId) : {
      enabled: false,
      remainingBackupCodes: 0
    }
  );
  const [error, setError] = useState<string | null>(null);

  // Actions
  const setupTwoFactor = useCallback(async (userIdParam: string): Promise<TwoFactorSetupData | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await twoFactorAuthManager.setupTwoFactor(userIdParam);
      setSetupData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to setup 2FA';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeTwoFactorSetup = useCallback(async (userIdParam: string, verificationCode: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await twoFactorAuthManager.completeTwoFactorSetup(userIdParam, verificationCode);
      
      if (result.isValid) {
        setSetupData(null);
        setStatus(twoFactorAuthManager.getTwoFactorStatus(userIdParam));
        return true;
      } else {
        setError(result.error || 'Failed to complete 2FA setup');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete 2FA setup';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyTwoFactor = useCallback(async (
    userIdParam: string, 
    code: string, 
    isBackupCode = false
  ): Promise<TwoFactorVerificationResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await twoFactorAuthManager.verifyTwoFactor(userIdParam, code, isBackupCode);
      
      if (!result.isValid && result.error) {
        setError(result.error);
      } else if (result.isValid) {
        setStatus(twoFactorAuthManager.getTwoFactorStatus(userIdParam));
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify 2FA code';
      setError(errorMessage);
      
      return {
        isValid: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disableTwoFactor = useCallback(async (userIdParam: string, verificationCode: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await twoFactorAuthManager.disableTwoFactor(userIdParam, verificationCode);
      
      if (result.isValid) {
        setStatus(twoFactorAuthManager.getTwoFactorStatus(userIdParam));
        return true;
      } else {
        setError(result.error || 'Failed to disable 2FA');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disable 2FA';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const regenerateBackupCodes = useCallback(async (userIdParam: string, verificationCode: string): Promise<readonly string[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await twoFactorAuthManager.regenerateBackupCodes(userIdParam, verificationCode);
      
      if (result.error) {
        setError(result.error);
        return [];
      } else {
        setStatus(twoFactorAuthManager.getTwoFactorStatus(userIdParam));
        return result.codes;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to regenerate backup codes';
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshStatus = useCallback((userIdParam: string) => {
    setStatus(twoFactorAuthManager.getTwoFactorStatus(userIdParam));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoized state
  const state = useMemo(() => ({
    isLoading,
    isEnabled: status.enabled,
    setupData,
    status,
    error
  }), [isLoading, status, setupData, error]);

  // Memoized actions
  const actions = useMemo(() => ({
    setupTwoFactor,
    completeTwoFactorSetup,
    verifyTwoFactor,
    disableTwoFactor,
    regenerateBackupCodes,
    refreshStatus,
    clearError
  }), [
    setupTwoFactor,
    completeTwoFactorSetup,
    verifyTwoFactor,
    disableTwoFactor,
    regenerateBackupCodes,
    refreshStatus,
    clearError
  ]);

  return { ...state, ...actions };
}

// Specialized hook for 2FA verification flow
export function useTwoFactorVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [verificationResult, setVerificationResult] = useState<TwoFactorVerificationResult | null>(null);

  const { verifyTwoFactor, isLoading, error } = useTwoFactorAuth();

  const handleVerification = useCallback(async (userId: string) => {
    if (!verificationCode.trim()) {
      return;
    }

    const result = await verifyTwoFactor(userId, verificationCode.trim(), useBackupCode);
    setVerificationResult(result);
    
    if (result.isValid) {
      setVerificationCode('');
      setUseBackupCode(false);
    }
    
    return result;
  }, [verificationCode, useBackupCode, verifyTwoFactor]);

  const resetVerification = useCallback(() => {
    setVerificationCode('');
    setUseBackupCode(false);
    setVerificationResult(null);
  }, []);

  return {
    verificationCode,
    setVerificationCode,
    useBackupCode,
    setUseBackupCode,
    verificationResult,
    isLoading,
    error,
    handleVerification,
    resetVerification
  };
}

// Hook for 2FA setup flow
export function useTwoFactorSetup() {
  const [currentStep, setCurrentStep] = useState<'initial' | 'setup' | 'verification' | 'complete'>('initial');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<readonly string[]>([]);

  const { 
    setupTwoFactor, 
    completeTwoFactorSetup, 
    setupData, 
    isLoading, 
    error, 
    clearError 
  } = useTwoFactorAuth();

  const startSetup = useCallback(async (userId: string) => {
    clearError();
    setCurrentStep('setup');
    
    const data = await setupTwoFactor(userId);
    if (data) {
      setBackupCodes(data.backupCodes);
      setCurrentStep('verification');
    } else {
      setCurrentStep('initial');
    }
  }, [setupTwoFactor, clearError]);

  const completeSetup = useCallback(async (userId: string) => {
    if (!verificationCode.trim()) {
      return false;
    }

    const success = await completeTwoFactorSetup(userId, verificationCode.trim());
    
    if (success) {
      setCurrentStep('complete');
      setVerificationCode('');
    }
    
    return success;
  }, [verificationCode, completeTwoFactorSetup]);

  const resetSetup = useCallback(() => {
    setCurrentStep('initial');
    setVerificationCode('');
    setBackupCodes([]);
    clearError();
  }, [clearError]);

  return {
    currentStep,
    verificationCode,
    setVerificationCode,
    backupCodes,
    setupData,
    isLoading,
    error,
    startSetup,
    completeSetup,
    resetSetup
  };
}
