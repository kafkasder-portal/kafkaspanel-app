/**
 * PWA Hook - React hook for PWA functionality
 * TypeScript best practices ile PWA state management
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { pwaManager } from '@/lib/pwa/pwaManager';
import { offlineActionQueue } from '@/lib/pwa/offlineQueue';
import type { 
  PWACapabilities, 
  PWAUpdateInfo, 
  NotificationOptions
} from '@/lib/pwa/pwaManager';
import type { QueueStats } from '@/lib/pwa/offlineQueue';

// Types
interface PWAState {
  readonly isOnline: boolean;
  readonly isInstallable: boolean;
  readonly isInstalled: boolean;
  readonly hasUpdate: boolean;
  readonly isOfflineCapable: boolean;
  readonly capabilities: PWACapabilities;
  readonly queueStats: QueueStats | null;
}

interface PWAActions {
  readonly installApp: () => Promise<boolean>;
  readonly updateApp: () => Promise<boolean>;
  readonly sendNotification: (options: NotificationOptions) => Promise<boolean>;
  readonly shareContent: (data: {
    readonly title?: string;
    readonly text?: string;
    readonly url?: string;
    readonly files?: readonly File[];
  }) => Promise<boolean>;
  readonly clearCache: () => Promise<void>;
  readonly processOfflineQueue: () => Promise<void>;
  readonly enqueueOfflineAction: (action: {
    readonly type: 'CREATE' | 'UPDATE' | 'DELETE' | 'SYNC';
    readonly endpoint: string;
    readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    readonly data?: unknown;
    readonly priority?: 'low' | 'medium' | 'high' | 'critical';
    readonly description?: string;
  }) => Promise<string>;
}

export function usePWA(): PWAState & PWAActions {
  // State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [capabilities, setCapabilities] = useState<PWACapabilities>({
    serviceWorker: false,
    installPrompt: false,
    pushNotifications: false,
    backgroundSync: false,
    share: false,
    fileSystemAccess: false,
    webShare: false
  });
  const [queueStats, setQueueStats] = useState<QueueStats | null>(null);

  // Memoized values
  const isOfflineCapable = useMemo(() => 
    capabilities.serviceWorker && capabilities.backgroundSync, 
    [capabilities]
  );

  // Actions
  const installApp = useCallback(async (): Promise<boolean> => {
    const result = await pwaManager.installPWA();
    if (result) {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    return result;
  }, []);

  const updateApp = useCallback(async (): Promise<boolean> => {
    const result = await pwaManager.updateServiceWorker();
    if (result) {
      setHasUpdate(false);
      // Reload the page to apply updates
      window.location.reload();
    }
    return result;
  }, []);

  const sendNotification = useCallback(async (options: NotificationOptions): Promise<boolean> => {
    return await pwaManager.sendNotification(options);
  }, []);

  const shareContent = useCallback(async (data: {
    readonly title?: string;
    readonly text?: string;
    readonly url?: string;
    readonly files?: readonly File[];
  }): Promise<boolean> => {
    return await pwaManager.shareContent(data);
  }, []);

  const clearCache = useCallback(async (): Promise<void> => {
    await pwaManager.clearApplicationCache();
    
    // Update queue stats after clearing
    const stats = await offlineActionQueue.getQueueStats();
    setQueueStats(stats);
  }, []);

  const processOfflineQueue = useCallback(async (): Promise<void> => {
    if (!isOnline) return;
    
    try {
      await offlineActionQueue.processQueue();
      
      // Update stats after processing
      const stats = await offlineActionQueue.getQueueStats();
      setQueueStats(stats);
      
      // Send notification about sync results
      if (stats.pendingActions === 0 && stats.totalActions > 0) {
        await sendNotification({
          title: '✅ Senkronizasyon Tamamlandı',
          body: 'Tüm offline işlemler başarıyla senkronize edildi.',
          tag: 'sync-complete'
        });
      }
    } catch (error) {
      console.error('Offline queue processing failed:', error);
      await sendNotification({
        title: '❌ Senkronizasyon Hatası',
        body: 'Bazı işlemler senkronize edilemedi. Tekrar denenecek.',
        tag: 'sync-error'
      });
    }
  }, [isOnline, sendNotification]);

  const enqueueOfflineAction = useCallback(async (action: {
    readonly type: 'CREATE' | 'UPDATE' | 'DELETE' | 'SYNC';
    readonly endpoint: string;
    readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    readonly data?: unknown;
    readonly priority?: 'low' | 'medium' | 'high' | 'critical';
    readonly description?: string;
  }): Promise<string> => {
    const actionId = await offlineActionQueue.enqueue({
      type: action.type,
      endpoint: action.endpoint,
      method: action.method,
      data: action.data,
      priority: action.priority || 'medium',
      maxRetries: 3,
      metadata: {
        description: action.description,
        userFeedback: action.description
      }
    });

    // Update queue stats
    const stats = await offlineActionQueue.getQueueStats();
    setQueueStats(stats);

    // If online, try to process immediately
    if (isOnline) {
      processOfflineQueue();
    } else {
      // Notify user that action was queued
      await sendNotification({
        title: '📝 İşlem Kuyruğa Alındı',
        body: action.description || 'İşleminiz offline kuyruğa eklendi.',
        tag: 'action-queued'
      });
    }

    return actionId;
  }, [isOnline, processOfflineQueue, sendNotification]);

  // Effects
  useEffect(() => {
    // Initialize PWA capabilities
    const initCapabilities = async () => {
      const caps = pwaManager.getCapabilities();
      setCapabilities(caps);
      setIsInstallable(caps.installPrompt);
    };
    
    initCapabilities();
  }, []);

  useEffect(() => {
    // Check if app is already installed
    const checkInstallStatus = () => {
      // Check if running in standalone mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                           (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
    };
    
    checkInstallStatus();
  }, []);

  useEffect(() => {
    // Setup online/offline listeners
    const handleOnline = () => {
      setIsOnline(true);
      processOfflineQueue();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [processOfflineQueue]);

  useEffect(() => {
    // Check for updates periodically
    const checkUpdates = async () => {
      const updateInfo: PWAUpdateInfo = await pwaManager.checkForUpdates();
      setHasUpdate(updateInfo.hasUpdate);
    };

    // Check on mount
    checkUpdates();

    // Check every 5 minutes
    const interval = setInterval(checkUpdates, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load initial queue stats
    const loadQueueStats = async () => {
      const stats = await offlineActionQueue.getQueueStats();
      setQueueStats(stats);
    };
    
    loadQueueStats();
  }, []);

  useEffect(() => {
    // Listen for install prompt events
    const handleBeforeInstallPrompt = () => {
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Performance optimization: memoize the returned object
  return useMemo(() => ({
    // State
    isOnline,
    isInstallable,
    isInstalled,
    hasUpdate,
    isOfflineCapable,
    capabilities,
    queueStats,
    
    // Actions
    installApp,
    updateApp,
    sendNotification,
    shareContent,
    clearCache,
    processOfflineQueue,
    enqueueOfflineAction
  }), [
    isOnline,
    isInstallable,
    isInstalled,
    hasUpdate,
    isOfflineCapable,
    capabilities,
    queueStats,
    installApp,
    updateApp,
    sendNotification,
    shareContent,
    clearCache,
    processOfflineQueue,
    enqueueOfflineAction
  ]);
}

// Specialized hooks for specific PWA features
export function useOfflineQueue() {
  const { queueStats, processOfflineQueue, enqueueOfflineAction } = usePWA();
  
  return useMemo(() => ({
    queueStats,
    processOfflineQueue,
    enqueueOfflineAction
  }), [queueStats, processOfflineQueue, enqueueOfflineAction]);
}

export function useInstallPrompt() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  
  return useMemo(() => ({
    isInstallable,
    isInstalled,
    installApp
  }), [isInstallable, isInstalled, installApp]);
}

export function useAppUpdates() {
  const { hasUpdate, updateApp } = usePWA();
  
  return useMemo(() => ({
    hasUpdate,
    updateApp
  }), [hasUpdate, updateApp]);
}

export function useWebShare() {
  const { capabilities, shareContent } = usePWA();
  
  return useMemo(() => ({
    isSupported: capabilities.webShare,
    shareContent
  }), [capabilities.webShare, shareContent]);
}