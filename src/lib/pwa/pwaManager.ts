/**
 * PWA Manager - Advanced Progressive Web App Features
 * TypeScript best practices ile gelişmiş PWA yönetimi
 */

import { advancedCacheManager } from './advancedCaching';
import { offlineActionQueue } from './offlineQueue';

// Types
export interface PWACapabilities {
  readonly serviceWorker: boolean;
  readonly installPrompt: boolean;
  readonly pushNotifications: boolean;
  readonly backgroundSync: boolean;
  readonly share: boolean;
  readonly fileSystemAccess: boolean;
  readonly webShare: boolean;
}

export interface InstallPromptEvent extends Event {
  readonly platforms: readonly string[];
  readonly userChoice: Promise<{
    readonly outcome: 'accepted' | 'dismissed';
    readonly platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAUpdateInfo {
  readonly hasUpdate: boolean;
  readonly version?: string;
  readonly releaseNotes?: string;
  readonly mandatory?: boolean;
}

export interface NotificationOptions {
  readonly title: string;
  readonly body?: string;
  readonly icon?: string;
  readonly badge?: string;
  readonly tag?: string;
  readonly data?: unknown;
  readonly actions?: readonly {
    readonly action: string;
    readonly title: string;
    readonly icon?: string;
  }[];
  readonly silent?: boolean;
  readonly vibrate?: readonly number[];
}

export class PWAManager {
  private static instance: PWAManager;
  private installPromptEvent: InstallPromptEvent | null = null;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
  // private updateAvailable = false;
  
  private constructor() {
    // Singleton pattern
    this.initializePWA();
  }
  
  static getInstance(): PWAManager {
    if (!PWAManager.instance) {
      PWAManager.instance = new PWAManager();
    }
    return PWAManager.instance;
  }

  /**
   * PWA yeteneklerini kontrol et
   */
  getCapabilities(): PWACapabilities {
    return {
      serviceWorker: 'serviceWorker' in navigator,
      installPrompt: this.installPromptEvent !== null,
      pushNotifications: 'PushManager' in window && 'Notification' in window,
      backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
      share: 'share' in navigator,
      fileSystemAccess: 'showOpenFilePicker' in window,
      webShare: 'share' in navigator
    } as const;
  }

  /**
   * PWA kurulumu
   */
  async installPWA(): Promise<boolean> {
    if (!this.installPromptEvent) {
      return false;
    }

    try {
      await this.installPromptEvent.prompt();
      const choiceResult = await this.installPromptEvent.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('🎉 PWA başarıyla kuruldu!');
        this.installPromptEvent = null;
        return true;
      } else {
        console.log('❌ PWA kurulumu reddedildi');
        return false;
      }
    } catch (error) {
      console.error('PWA kurulum hatası:', error);
      return false;
    }
  }

  /**
   * Service Worker güncellemesi
   */
  async updateServiceWorker(): Promise<boolean> {
    if (!this.serviceWorkerRegistration) {
      return false;
    }

    try {
      await this.serviceWorkerRegistration.update();
      
      // Check for updates
      if (this.serviceWorkerRegistration.waiting) {
        // New service worker is waiting
        this.serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Service Worker güncelleme hatası:', error);
      return false;
    }
  }

  /**
   * Push notification izni
   */
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  /**
   * Push notification gönder
   */
  async sendNotification(options: NotificationOptions): Promise<boolean> {
    const permission = await this.requestNotificationPermission();
    
    if (permission !== 'granted') {
      return false;
    }

    try {
      if (this.serviceWorkerRegistration) {
        await this.serviceWorkerRegistration.showNotification(options.title, {
          body: options.body,
          icon: options.icon || '/pwa-192x192.svg',
          badge: options.badge || '/pwa-192x192.svg',
          tag: options.tag,
          data: options.data,
          // actions: options.actions as any, // Not supported in all browsers
          silent: options.silent
          // vibrate: options.vibrate as VibratePattern // Not supported in all browsers
        });
      } else {
        new Notification(options.title, {
          body: options.body,
          icon: options.icon || '/pwa-192x192.svg',
          tag: options.tag,
          data: options.data,
          silent: options.silent
        });
      }
      
      return true;
    } catch (error) {
      console.error('Notification gönderme hatası:', error);
      return false;
    }
  }

  /**
   * Web Share API
   */
  async shareContent(data: {
    readonly title?: string;
    readonly text?: string;
    readonly url?: string;
    readonly files?: readonly File[];
  }): Promise<boolean> {
    if (!('share' in navigator)) {
      // Fallback to clipboard
      return this.fallbackShare(data);
    }

    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
        files: data.files as File[]
      });
      return true;
    } catch (error) {
      console.error('Share hatası:', error);
      return this.fallbackShare(data);
    }
  }

  /**
   * App güncelleme kontrolü
   */
  async checkForUpdates(): Promise<PWAUpdateInfo> {
    if (!this.serviceWorkerRegistration) {
      return { hasUpdate: false };
    }

    try {
      await this.serviceWorkerRegistration.update();
      
      if (this.serviceWorkerRegistration.waiting) {
        return {
          hasUpdate: true,
          version: await this.getVersionFromSW(),
          releaseNotes: 'Yeni özellikler ve hata düzeltmeleri'
        };
      }
      
      return { hasUpdate: false };
    } catch (error) {
      console.error('Güncelleme kontrolü hatası:', error);
      return { hasUpdate: false };
    }
  }

  /**
   * Offline desteği başlat
   */
  initializeOfflineSupport(): void {
    // Initialize offline queue network listeners
    offlineActionQueue.initializeNetworkListeners();
    
    // Monitor connection status
    window.addEventListener('online', () => {
      this.sendNotification({
        title: '🌐 İnternet Bağlantısı',
        body: 'İnternet bağlantınız geri geldi. Bekleyen işlemler senkronize ediliyor...',
        tag: 'connection-restored'
      });
    });

    window.addEventListener('offline', () => {
      this.sendNotification({
        title: '📵 Offline Mod',
        body: 'İnternet bağlantınız kesildi. İşlemleriniz offline olarak devam edecek.',
        tag: 'connection-lost'
      });
    });
  }

  /**
   * App performans metriklerini al
   */
  getPerformanceMetrics(): {
    readonly cacheHitRate: number;
    readonly averageLoadTime: number;
    readonly offlineActions: number;
  } {
    // Bu veriler gerçek uygulamada daha detaylı olacak
    return {
      cacheHitRate: 0.85, // %85 cache hit rate
      averageLoadTime: 1200, // 1.2 seconds
      offlineActions: 0 // offline queue'dan alınacak
    } as const;
  }

  /**
   * Cache temizleme
   */
  async clearApplicationCache(): Promise<void> {
    // Clear all caches
    await advancedCacheManager.clear();
    
    // Clear offline queue
    await offlineActionQueue.clearQueue();
    
    // Clear service worker caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
    
    // Notify user
    await this.sendNotification({
      title: '🧹 Cache Temizlendi',
      body: 'Uygulama cache\'i başarıyla temizlendi.',
      tag: 'cache-cleared'
    });
  }

  // Private methods
  private async initializePWA(): Promise<void> {
    // Register service worker
    await this.registerServiceWorker();
    
    // Listen for install prompt
    this.setupInstallPrompt();
    
    // Setup update listeners
    this.setupUpdateListeners();
    
    // Initialize offline support
    this.initializeOfflineSupport();
  }

  private async registerServiceWorker(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker desteklenmiyor');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      this.serviceWorkerRegistration = registration;
      
      console.log('✅ Service Worker başarıyla kaydedildi');
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // this.updateAvailable = true;
              this.notifyUpdateAvailable();
            }
          });
        }
      });
      
    } catch (error) {
      console.error('Service Worker kayıt hatası:', error);
    }
  }

  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      
      // Save the event so it can be triggered later
      this.installPromptEvent = event as InstallPromptEvent;
      
      console.log('💾 PWA kurulum promptu hazır');
    });

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      console.log('🎉 PWA başarıyla kuruldu!');
      this.installPromptEvent = null;
    });
  }

  private setupUpdateListeners(): void {
    // Listen for service worker messages
    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data?.type === 'UPDATE_AVAILABLE') {
        this.notifyUpdateAvailable();
      }
    });
  }

  private async notifyUpdateAvailable(): Promise<void> {
    await this.sendNotification({
      title: '🆕 Güncelleme Mevcut',
      body: 'Yeni bir uygulama sürümü mevcut. Güncellemek ister misiniz?',
      tag: 'app-update',
      actions: [
        {
          action: 'update',
          title: 'Güncelle'
        },
        {
          action: 'dismiss',
          title: 'Daha Sonra'
        }
      ]
    });
  }

  private async getVersionFromSW(): Promise<string> {
    // This would typically come from the service worker
    return `v${Date.now()}`;
  }

  private async fallbackShare(data: {
    readonly title?: string;
    readonly text?: string;
    readonly url?: string;
  }): Promise<boolean> {
    try {
      const shareText = [data.title, data.text, data.url]
        .filter(Boolean)
        .join('\n');
      
      await navigator.clipboard.writeText(shareText);
      
      await this.sendNotification({
        title: '📋 Panoya Kopyalandı',
        body: 'İçerik panoya kopyalandı.',
        tag: 'clipboard-copy'
      });
      
      return true;
    } catch (error) {
      console.error('Fallback share hatası:', error);
      return false;
    }
  }
}

// Singleton instance export
export const pwaManager = PWAManager.getInstance();
