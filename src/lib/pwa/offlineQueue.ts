/**
 * Offline Action Queue System
 * TypeScript best practices ile offline işlem yönetimi
 */

// Types - Immutable ve type-safe
export interface QueuedAction {
  readonly id: string;
  readonly type: 'CREATE' | 'UPDATE' | 'DELETE' | 'SYNC';
  readonly endpoint: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly data?: unknown;
  readonly headers?: Record<string, string>;
  readonly timestamp: number;
  readonly retryCount: number;
  readonly maxRetries: number;
  readonly priority: 'low' | 'medium' | 'high' | 'critical';
  readonly metadata?: {
    readonly module?: string;
    readonly description?: string;
    readonly userFeedback?: string;
  };
}

export interface QueueStats {
  readonly totalActions: number;
  readonly pendingActions: number;
  readonly failedActions: number;
  readonly completedActions: number;
  readonly oldestAction: number;
  readonly queueSize: number; // in bytes
}

export interface SyncResult {
  readonly success: boolean;
  readonly actionId: string;
  readonly response?: unknown;
  readonly error?: string;
}

// Priority order for action execution
const PRIORITY_ORDER: Record<QueuedAction['priority'], number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1
} as const;

export class OfflineActionQueue {
  private static instance: OfflineActionQueue;
  private readonly storageKey = 'dernek_offline_queue';
  private readonly completedStorageKey = 'dernek_completed_actions';
  private isProcessing = false;
  private readonly maxQueueSize = 1000; // Maximum actions in queue
  private readonly maxCompletedActions = 100; // Keep completed actions for reference
  
  private constructor() {
    // Singleton pattern
    this.initializeQueue();
  }
  
  static getInstance(): OfflineActionQueue {
    if (!OfflineActionQueue.instance) {
      OfflineActionQueue.instance = new OfflineActionQueue();
    }
    return OfflineActionQueue.instance;
  }

  /**
   * Offline action ekleme
   */
  async enqueue(action: Omit<QueuedAction, 'id' | 'timestamp' | 'retryCount'>): Promise<string> {
    const actionId = this.generateActionId();
    
    const queuedAction: QueuedAction = {
      ...action,
      id: actionId,
      timestamp: Date.now(),
      retryCount: 0
    } as const;

    const queue = await this.getQueue();
    const updatedQueue = [...queue, queuedAction];
    
    // Queue size control
    if (updatedQueue.length > this.maxQueueSize) {
      // Remove oldest low priority actions
      const filteredQueue = this.removeOldLowPriorityActions(updatedQueue);
      await this.saveQueue(filteredQueue);
    } else {
      await this.saveQueue(updatedQueue);
    }

    // Notify user
    this.notifyActionQueued(queuedAction);
    
    // Try to process if online
    if (navigator.onLine) {
      this.processQueue();
    }

    return actionId;
  }

  /**
   * Action silme
   */
  async dequeue(actionId: string): Promise<boolean> {
    const queue = await this.getQueue();
    const updatedQueue = queue.filter(action => action.id !== actionId);
    
    if (updatedQueue.length !== queue.length) {
      await this.saveQueue(updatedQueue);
      return true;
    }
    
    return false;
  }

  /**
   * Queue işleme
   */
  async processQueue(): Promise<SyncResult[]> {
    if (this.isProcessing || !navigator.onLine) {
      return [];
    }

    this.isProcessing = true;
    const results: SyncResult[] = [];

    try {
      const queue = await this.getQueue();
      if (queue.length === 0) {
        return results;
      }

      // Sort by priority and timestamp
      const sortedQueue = this.sortByPriority(queue);
      
      // Process actions in batches
      const batchSize = 5;
      for (let i = 0; i < sortedQueue.length; i += batchSize) {
        const batch = sortedQueue.slice(i, i + batchSize);
        const batchResults = await this.processBatch(batch);
        results.push(...batchResults);
        
        // Small delay between batches to prevent overwhelming the server
        if (i + batchSize < sortedQueue.length) {
          await this.delay(500);
        }
      }

      // Update queue with failed actions
      const failedActions = results
        .filter(result => !result.success)
        .map(result => {
          const action = queue.find(a => a.id === result.actionId);
          if (action && action.retryCount < action.maxRetries) {
            return {
              ...action,
              retryCount: action.retryCount + 1
            } as const;
          }
          return null;
        })
        .filter((action): action is QueuedAction => action !== null);

      await this.saveQueue(failedActions);
      
      // Save completed actions for reference
      const completedActions = results
        .filter(result => result.success)
        .map(result => ({
          ...queue.find(a => a.id === result.actionId)!,
          completedAt: Date.now(),
          result: result.response
        }));
      
      await this.saveCompletedActions(completedActions);

    } finally {
      this.isProcessing = false;
    }

    // Notify user about sync results
    this.notifySyncResults(results);
    
    return results;
  }

  /**
   * Queue istatistikleri
   */
  async getQueueStats(): Promise<QueueStats> {
    const queue = await this.getQueue();
    const completed = await this.getCompletedActions();
    
    const totalActions = queue.length + completed.length;
    const pendingActions = queue.filter(a => a.retryCount < a.maxRetries).length;
    const failedActions = queue.filter(a => a.retryCount >= a.maxRetries).length;
    const completedActions = completed.length;
    
    const oldestAction = queue.length > 0 
      ? Math.min(...queue.map(a => a.timestamp))
      : Date.now();
    
    const queueSize = this.calculateQueueSize(queue);

    return {
      totalActions,
      pendingActions,
      failedActions,
      completedActions,
      oldestAction,
      queueSize
    } as const;
  }

  /**
   * Failed actions temizleme
   */
  async clearFailedActions(): Promise<number> {
    const queue = await this.getQueue();
    const failed = queue.filter(a => a.retryCount >= a.maxRetries);
    const remaining = queue.filter(a => a.retryCount < a.maxRetries);
    
    await this.saveQueue(remaining);
    return failed.length;
  }

  /**
   * Tüm queue temizleme
   */
  async clearQueue(): Promise<void> {
    await this.saveQueue([]);
    await this.saveCompletedActions([]);
  }

  /**
   * Network durumu değişikliklerini dinle
   */
  initializeNetworkListeners(): void {
    window.addEventListener('online', () => {
      console.log('🌐 İnternet bağlantısı geri geldi, queue işleniyor...');
      this.processQueue();
    });

    window.addEventListener('offline', () => {
      console.log('📵 İnternet bağlantısı kesildi, işlemler kuyruğa alınıyor...');
    });
  }

  // Private methods
  private async initializeQueue(): Promise<void> {
    // Cleanup old completed actions on startup
    const completed = await this.getCompletedActions();
    if (completed.length > this.maxCompletedActions) {
      const recent = [...completed]
        .sort((a: any, b: any) => b.completedAt - a.completedAt)
        .slice(0, this.maxCompletedActions);
      await this.saveCompletedActions(recent);
    }
  }

  private async getQueue(): Promise<readonly QueuedAction[]> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load queue:', error);
      return [];
    }
  }

  private async saveQueue(queue: readonly QueuedAction[]): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to save queue:', error);
      // Try to free up space and retry
      await this.clearFailedActions();
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(queue));
      } catch (retryError) {
        console.error('Failed to save queue after cleanup:', retryError);
      }
    }
  }

  private async getCompletedActions(): Promise<readonly unknown[]> {
    try {
      const stored = localStorage.getItem(this.completedStorageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load completed actions:', error);
      return [];
    }
  }

  private async saveCompletedActions(actions: readonly unknown[]): Promise<void> {
    try {
      const existing = await this.getCompletedActions();
      const combined = [...existing, ...actions];
      const limited = combined.slice(-this.maxCompletedActions);
      localStorage.setItem(this.completedStorageKey, JSON.stringify(limited));
    } catch (error) {
      console.error('Failed to save completed actions:', error);
    }
  }

  private sortByPriority(queue: readonly QueuedAction[]): readonly QueuedAction[] {
    return [...queue].sort((a, b) => {
      // Priority first
      const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by timestamp (older first)
      return a.timestamp - b.timestamp;
    });
  }

  private async processBatch(batch: readonly QueuedAction[]): Promise<SyncResult[]> {
    const promises = batch.map(action => this.processAction(action));
    return Promise.all(promises);
  }

  private async processAction(action: QueuedAction): Promise<SyncResult> {
    try {
      const response = await fetch(action.endpoint, {
        method: action.method,
        headers: {
          'Content-Type': 'application/json',
          ...action.headers
        },
        body: action.data ? JSON.stringify(action.data) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      return {
        success: true,
        actionId: action.id,
        response: responseData
      } as const;

    } catch (error) {
      return {
        success: false,
        actionId: action.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      } as const;
    }
  }

  private removeOldLowPriorityActions(queue: readonly QueuedAction[]): readonly QueuedAction[] {
    // Keep high priority and recent actions, remove old low priority ones
    const sorted = [...queue].sort((a, b) => {
      const priorityDiff = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.timestamp - a.timestamp; // newer first
    });
    
    return sorted.slice(0, this.maxQueueSize);
  }

  private calculateQueueSize(queue: readonly QueuedAction[]): number {
    try {
      return new Blob([JSON.stringify(queue)]).size;
    } catch {
      return 0;
    }
  }

  private generateActionId(): string {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private notifyActionQueued(action: QueuedAction): void {
    if (action.metadata?.userFeedback) {
      console.log(`📝 ${action.metadata.userFeedback} (offline queue'ya eklendi)`);
    }
  }

  private notifySyncResults(results: readonly SyncResult[]): void {
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    if (successful > 0) {
      console.log(`✅ ${successful} işlem başarıyla senkronize edildi`);
    }
    
    if (failed > 0) {
      console.log(`❌ ${failed} işlem başarısız oldu, tekrar denenecek`);
    }
  }
}

// Singleton instance export
export const offlineActionQueue = OfflineActionQueue.getInstance();
