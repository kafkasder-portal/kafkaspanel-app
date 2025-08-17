/**
 * Real-time Notification Manager
 * TypeScript best practices ile gerçek zamanlı bildirim yönetimi
 */

import { websocketManager, WEBSOCKET_EVENTS } from './websocketManager';
import { pwaManager } from '../pwa/pwaManager';

// Types
export interface RealtimeNotification {
  readonly id: string;
  readonly type: 'info' | 'success' | 'warning' | 'error' | 'urgent';
  readonly title: string;
  readonly message: string;
  readonly timestamp: Date;
  readonly userId?: string;
  readonly moduleId?: string;
  readonly actionUrl?: string;
  readonly data?: unknown;
  readonly persistent?: boolean;
  readonly sound?: boolean;
  readonly vibrate?: boolean;
}

export interface NotificationRule {
  readonly id: string;
  readonly eventType: string;
  readonly condition?: (data: unknown) => boolean;
  readonly transform: (data: unknown) => Partial<RealtimeNotification>;
  readonly enabled: boolean;
  readonly priority: number;
}

export interface NotificationSettings {
  readonly userId: string;
  readonly enabledTypes: readonly string[];
  readonly soundEnabled: boolean;
  readonly vibrateEnabled: boolean;
  readonly pushEnabled: boolean;
  readonly quietHours: {
    readonly enabled: boolean;
    readonly startHour: number;
    readonly endHour: number;
  };
  readonly moduleSettings: Record<string, {
    readonly enabled: boolean;
    readonly urgentOnly: boolean;
  }>;
}

// Notification types
export const NOTIFICATION_TYPES = {
  DONATION_RECEIVED: 'donation:received',
  MEETING_REMINDER: 'meeting:reminder',
  TASK_ASSIGNED: 'task:assigned',
  TASK_COMPLETED: 'task:completed',
  SYSTEM_ALERT: 'system:alert',
  USER_MESSAGE: 'user:message',
  APPROVAL_REQUEST: 'approval:request',
  REPORT_READY: 'report:ready',
  DEADLINE_APPROACHING: 'deadline:approaching',
  EMERGENCY_ALERT: 'emergency:alert'
} as const;

// Default notification rules
const DEFAULT_NOTIFICATION_RULES: readonly NotificationRule[] = [
  {
    id: 'donation-received',
    eventType: WEBSOCKET_EVENTS.DONATION_CREATED,
    transform: (data: any) => ({
      type: 'success',
      title: '💰 Yeni Bağış Alındı',
      message: `${data.amount} ${data.currency} bağış alındı`,
      moduleId: 'donations',
      actionUrl: '/donations',
      sound: true,
      vibrate: true
    }),
    enabled: true,
    priority: 8
  },
  
  {
    id: 'meeting-started',
    eventType: WEBSOCKET_EVENTS.MEETING_STARTED,
    transform: (data: any) => ({
      type: 'info',
      title: '📅 Toplantı Başladı',
      message: `${data.title} toplantısı başladı`,
      moduleId: 'meetings',
      actionUrl: `/meetings/${data.id}`,
      sound: true
    }),
    enabled: true,
    priority: 7
  },
  
  {
    id: 'task-assigned',
    eventType: WEBSOCKET_EVENTS.TASK_ASSIGNED,
    condition: (data: any) => data.assigneeId === getCurrentUserId(),
    transform: (data: any) => ({
      type: 'info',
      title: '📋 Yeni Görev Atandı',
      message: `Size "${data.title}" görevi atandı`,
      moduleId: 'tasks',
      actionUrl: `/tasks/${data.id}`,
      sound: true,
      persistent: true
    }),
    enabled: true,
    priority: 9
  },
  
  {
    id: 'beneficiary-updated',
    eventType: WEBSOCKET_EVENTS.BENEFICIARY_UPDATED,
    transform: (data: any) => ({
      type: 'info',
      title: '👤 Hak Sahibi Güncellendi',
      message: `${data.name} bilgileri güncellendi`,
      moduleId: 'aid',
      actionUrl: `/aid/beneficiaries/${data.id}`
    }),
    enabled: true,
    priority: 5
  },
  
  {
    id: 'system-alert',
    eventType: 'system:alert',
    transform: (data: any) => ({
      type: data.severity || 'warning',
      title: '🚨 Sistem Uyarısı',
      message: data.message,
      persistent: data.severity === 'error',
      sound: data.severity === 'error',
      vibrate: data.severity === 'error'
    }),
    enabled: true,
    priority: 10
  }
] as const;

// Helper function to get current user ID
function getCurrentUserId(): string {
  // This would typically come from auth context
  return 'current-user-id';
}

export class RealtimeNotificationManager {
  private static instance: RealtimeNotificationManager;
  private notificationRules = new Map<string, NotificationRule>();
  private activeNotifications = new Map<string, RealtimeNotification>();
  private settings: NotificationSettings | null = null;
  private isInitialized = false;
  
  private constructor() {
    // Singleton pattern
  }
  
  static getInstance(): RealtimeNotificationManager {
    if (!RealtimeNotificationManager.instance) {
      RealtimeNotificationManager.instance = new RealtimeNotificationManager();
    }
    return RealtimeNotificationManager.instance;
  }

  /**
   * Bildirim sistemini başlat
   */
  async initialize(userId: string): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load user settings
      await this.loadSettings(userId);
      
      // Load default rules
      DEFAULT_NOTIFICATION_RULES.forEach(rule => {
        this.notificationRules.set(rule.id, rule);
      });
      
      // Setup WebSocket listeners
      this.setupWebSocketListeners();
      
      // Connect to WebSocket if not already connected
      const isConnected = await websocketManager.connect();
      if (isConnected) {
        console.log('✅ Gerçek zamanlı bildirimler aktif');
      }
      
      this.isInitialized = true;
      
    } catch (error) {
      console.error('Failed to initialize notification manager:', error);
    }
  }

  /**
   * Bildirim kuralı ekle
   */
  addRule(rule: NotificationRule): void {
    this.notificationRules.set(rule.id, rule);
    
    // If not already listening for this event type, add listener
    if (!Array.from(this.notificationRules.values()).some(r => 
      r.id !== rule.id && r.eventType === rule.eventType
    )) {
      websocketManager.on(rule.eventType, (data) => {
        this.handleRealtimeEvent(rule.eventType, data);
      });
    }
  }

  /**
   * Bildirim kuralını kaldır
   */
  removeRule(ruleId: string): void {
    const rule = this.notificationRules.get(ruleId);
    if (!rule) return;
    
    this.notificationRules.delete(ruleId);
    
    // If no other rules for this event type, remove listener
    if (!Array.from(this.notificationRules.values()).some(r => 
      r.eventType === rule.eventType
    )) {
      websocketManager.off(rule.eventType);
    }
  }

  /**
   * Manuel bildirim gönder
   */
  async sendNotification(notification: Omit<RealtimeNotification, 'id' | 'timestamp'>): Promise<string> {
    const fullNotification: RealtimeNotification = {
      id: this.generateNotificationId(),
      timestamp: new Date(),
      ...notification
    };

    await this.processNotification(fullNotification);
    return fullNotification.id;
  }

  /**
   * Bildirimi kapat
   */
  dismissNotification(notificationId: string): void {
    this.activeNotifications.delete(notificationId);
  }

  /**
   * Tüm bildirimleri temizle
   */
  clearAllNotifications(): void {
    this.activeNotifications.clear();
  }

  /**
   * Aktif bildirimleri al
   */
  getActiveNotifications(): readonly RealtimeNotification[] {
    return Array.from(this.activeNotifications.values());
  }

  /**
   * Bildirim ayarlarını güncelle
   */
  async updateSettings(updates: Partial<NotificationSettings>): Promise<void> {
    if (!this.settings) return;
    
    this.settings = { ...this.settings, ...updates };
    await this.saveSettings();
  }

  /**
   * Sessiz saat kontrolü
   */
  isQuietHours(): boolean {
    if (!this.settings?.quietHours.enabled) return false;
    
    const now = new Date();
    const currentHour = now.getHours();
    const { startHour, endHour } = this.settings.quietHours;
    
    if (startHour <= endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      // Overnight quiet hours (e.g., 22:00 to 06:00)
      return currentHour >= startHour || currentHour < endHour;
    }
  }

  // Private methods
  private setupWebSocketListeners(): void {
    // Listen for all registered event types
    Array.from(this.notificationRules.values()).forEach(rule => {
      websocketManager.on(rule.eventType, (data) => {
        this.handleRealtimeEvent(rule.eventType, data);
      });
    });

    // Listen for connection events
    websocketManager.on(WEBSOCKET_EVENTS.CONNECT, () => {
      console.log('🔗 WebSocket bağlantısı kuruldu');
    });

    websocketManager.on(WEBSOCKET_EVENTS.DISCONNECT, () => {
      console.log('🔌 WebSocket bağlantısı kesildi');
    });

    websocketManager.on(WEBSOCKET_EVENTS.ERROR, (error) => {
      console.error('WebSocket hatası:', error);
    });
  }

  private async handleRealtimeEvent(eventType: string, data: unknown): Promise<void> {
    const applicableRules = Array.from(this.notificationRules.values())
      .filter(rule => 
        rule.eventType === eventType && 
        rule.enabled &&
        (!rule.condition || rule.condition(data))
      )
      .sort((a, b) => b.priority - a.priority);

    for (const rule of applicableRules) {
      try {
        const notificationData = rule.transform(data);
        const notification: RealtimeNotification = {
          id: this.generateNotificationId(),
          timestamp: new Date(),
          type: 'info',
          title: 'Bildirim',
          message: 'Yeni bir olay gerçekleşti',
          ...notificationData
        };

        await this.processNotification(notification);
        
        // Only process highest priority rule unless specified otherwise
        break;
        
      } catch (error) {
        console.error(`Error processing notification rule ${rule.id}:`, error);
      }
    }
  }

  private async processNotification(notification: RealtimeNotification): Promise<void> {
    // Check user settings
    if (!this.shouldShowNotification(notification)) {
      return;
    }

    // Add to active notifications
    this.activeNotifications.set(notification.id, notification);

    // Show browser notification if enabled
    if (this.settings?.pushEnabled && !this.isQuietHours()) {
      await this.showBrowserNotification(notification);
    }

    // Play sound if enabled
    if (notification.sound && this.settings?.soundEnabled && !this.isQuietHours()) {
      this.playNotificationSound(notification.type);
    }

    // Vibrate if enabled and supported
    if (notification.vibrate && this.settings?.vibrateEnabled && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }

    // Emit custom event for UI components
    window.dispatchEvent(new CustomEvent('realtime-notification', {
      detail: notification
    }));

    // Auto-dismiss non-persistent notifications
    if (!notification.persistent) {
      setTimeout(() => {
        this.dismissNotification(notification.id);
      }, 5000);
    }
  }

  private shouldShowNotification(notification: RealtimeNotification): boolean {
    if (!this.settings) return true;

    // Check if notification type is enabled
    if (notification.type && !this.settings.enabledTypes.includes(notification.type)) {
      return false;
    }

    // Check module settings
    if (notification.moduleId) {
      const moduleSettings = this.settings.moduleSettings[notification.moduleId];
      if (!moduleSettings?.enabled) {
        return false;
      }
      
      if (moduleSettings.urgentOnly && notification.type !== 'urgent') {
        return false;
      }
    }

    return true;
  }

  private async showBrowserNotification(notification: RealtimeNotification): Promise<void> {
    try {
      await pwaManager.sendNotification({
        title: notification.title,
        body: notification.message,
        tag: notification.id,
        data: {
          notificationId: notification.id,
          actionUrl: notification.actionUrl
        }
      });
    } catch (error) {
      console.error('Failed to show browser notification:', error);
    }
  }

  private playNotificationSound(type: RealtimeNotification['type']): void {
    try {
      // Create audio context if needed
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Generate different tones for different notification types
      const frequency = this.getNotificationFrequency(type);
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
    } catch (error) {
      console.error('Failed to play notification sound:', error);
    }
  }

  private getNotificationFrequency(type: RealtimeNotification['type']): number {
    const frequencies = {
      info: 440,     // A4
      success: 523,  // C5
      warning: 659,  // E5
      error: 784,    // G5
      urgent: 880    // A5
    };
    return frequencies[type] || frequencies.info;
  }

  private async loadSettings(userId: string): Promise<void> {
    try {
      const stored = localStorage.getItem(`notification_settings_${userId}`);
      if (stored) {
        this.settings = JSON.parse(stored);
      } else {
        // Default settings
        this.settings = {
          userId,
          enabledTypes: ['info', 'success', 'warning', 'error', 'urgent'],
          soundEnabled: true,
          vibrateEnabled: true,
          pushEnabled: true,
          quietHours: {
            enabled: false,
            startHour: 22,
            endHour: 8
          },
          moduleSettings: {}
        };
        await this.saveSettings();
      }
    } catch (error) {
      console.error('Failed to load notification settings:', error);
      // Use default settings
      this.settings = {
        userId,
        enabledTypes: ['info', 'success', 'warning', 'error', 'urgent'],
        soundEnabled: true,
        vibrateEnabled: true,
        pushEnabled: true,
        quietHours: {
          enabled: false,
          startHour: 22,
          endHour: 8
        },
        moduleSettings: {}
      };
    }
  }

  private async saveSettings(): Promise<void> {
    if (!this.settings) return;
    
    try {
      localStorage.setItem(
        `notification_settings_${this.settings.userId}`,
        JSON.stringify(this.settings)
      );
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  }

  private generateNotificationId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance export
export const realtimeNotificationManager = RealtimeNotificationManager.getInstance();
