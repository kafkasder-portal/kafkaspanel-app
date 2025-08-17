/**
 * Gelişmiş PWA Caching Sistemi
 * Context7 best practices ile optimized caching
 */

// Types - TypeScript best practices
export interface CacheConfig {
  readonly name: string;
  readonly maxSize: number;
  readonly maxAge: number; // milliseconds
  readonly strategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
}

export interface CacheEntry {
  readonly data: unknown;
  readonly timestamp: number;
  readonly etag?: string;
  readonly size: number;
}

export interface OfflineAction {
  readonly id: string;
  readonly type: string;
  readonly data: unknown;
  readonly timestamp: number;
  readonly retryCount: number;
}

// Advanced caching configuration
const CACHE_CONFIGS: Record<string, CacheConfig> = {
  API_DATA: {
    name: 'api-data-v1',
    maxSize: 100, // entries
    maxAge: 5 * 60 * 1000, // 5 minutes
    strategy: 'stale-while-revalidate'
  },
  STATIC_ASSETS: {
    name: 'static-assets-v1',
    maxSize: 200,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    strategy: 'cache-first'
  },
  USER_DATA: {
    name: 'user-data-v1',
    maxSize: 50,
    maxAge: 10 * 60 * 1000, // 10 minutes
    strategy: 'network-first'
  },
  IMAGES: {
    name: 'images-v1',
    maxSize: 100,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    strategy: 'cache-first'
  }
} as const;

export class AdvancedCacheManager {
  private static instance: AdvancedCacheManager;
  private readonly storagePrefix = 'dernek_cache_';
  
  private constructor() {
    // Singleton pattern
  }
  
  static getInstance(): AdvancedCacheManager {
    if (!AdvancedCacheManager.instance) {
      AdvancedCacheManager.instance = new AdvancedCacheManager();
    }
    return AdvancedCacheManager.instance;
  }

  /**
   * Akıllı cache okuma
   */
  async get<T>(
    key: string, 
    cacheType: keyof typeof CACHE_CONFIGS
  ): Promise<T | null> {
    try {
      const config = CACHE_CONFIGS[cacheType];
      const fullKey = `${this.storagePrefix}${config.name}_${key}`;
      
      const stored = localStorage.getItem(fullKey);
      if (!stored) return null;
      
      const entry: CacheEntry = JSON.parse(stored);
      
      // Check if expired
      const now = Date.now();
      if (now - entry.timestamp > config.maxAge) {
        this.delete(key, cacheType);
        return null;
      }
      
      return entry.data as T;
    } catch (error) {
      console.warn('Cache read error:', error);
      return null;
    }
  }

  /**
   * Akıllı cache yazma
   */
  async set<T>(
    key: string,
    data: T,
    cacheType: keyof typeof CACHE_CONFIGS,
    etag?: string
  ): Promise<void> {
    try {
      const config = CACHE_CONFIGS[cacheType];
      const fullKey = `${this.storagePrefix}${config.name}_${key}`;
      
      const entry: CacheEntry = {
        data,
        timestamp: Date.now(),
        etag,
        size: this.calculateSize(data)
      };
      
      localStorage.setItem(fullKey, JSON.stringify(entry));
      
      // Cache size management
      await this.enforceMaxSize(cacheType);
    } catch (error) {
      console.warn('Cache write error:', error);
      // Fallback: clear some space and retry
      await this.clearOldEntries(cacheType);
      try {
        const config = CACHE_CONFIGS[cacheType];
        const fullKey = `${this.storagePrefix}${config.name}_${key}`;
        const entry: CacheEntry = {
          data,
          timestamp: Date.now(),
          etag,
          size: this.calculateSize(data)
        };
        localStorage.setItem(fullKey, JSON.stringify(entry));
      } catch (retryError) {
        console.error('Cache retry failed:', retryError);
      }
    }
  }

  /**
   * Cache silme
   */
  async delete(key: string, cacheType: keyof typeof CACHE_CONFIGS): Promise<void> {
    const config = CACHE_CONFIGS[cacheType];
    const fullKey = `${this.storagePrefix}${config.name}_${key}`;
    localStorage.removeItem(fullKey);
  }

  /**
   * Cache temizleme
   */
  async clear(cacheType?: keyof typeof CACHE_CONFIGS): Promise<void> {
    if (cacheType) {
      const config = CACHE_CONFIGS[cacheType];
      const prefix = `${this.storagePrefix}${config.name}_`;
      
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } else {
      // Clear all app caches
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.storagePrefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Cache istatistikleri
   */
  async getStats(cacheType: keyof typeof CACHE_CONFIGS): Promise<{
    readonly entryCount: number;
    readonly totalSize: number;
    readonly oldestEntry: number;
    readonly newestEntry: number;
  }> {
    const config = CACHE_CONFIGS[cacheType];
    const prefix = `${this.storagePrefix}${config.name}_`;
    
    let entryCount = 0;
    let totalSize = 0;
    let oldestEntry = Date.now();
    let newestEntry = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const entry: CacheEntry = JSON.parse(stored);
            entryCount++;
            totalSize += entry.size;
            
            if (entry.timestamp < oldestEntry) {
              oldestEntry = entry.timestamp;
            }
            if (entry.timestamp > newestEntry) {
              newestEntry = entry.timestamp;
            }
          }
        } catch (error) {
          // Invalid entry, remove it
          localStorage.removeItem(key);
        }
      }
    }
    
    return {
      entryCount,
      totalSize,
      oldestEntry,
      newestEntry
    } as const;
  }

  /**
   * Smart fetch with caching
   */
  async smartFetch<T>(
    url: string,
    cacheType: keyof typeof CACHE_CONFIGS,
    options?: RequestInit
  ): Promise<T> {
    const config = CACHE_CONFIGS[cacheType];
    const cacheKey = this.generateCacheKey(url, options);
    
    switch (config.strategy) {
      case 'cache-first':
        return this.cacheFirstStrategy<T>(url, cacheKey, cacheType, options);
      
      case 'network-first':
        return this.networkFirstStrategy<T>(url, cacheKey, cacheType, options);
      
      case 'stale-while-revalidate':
        return this.staleWhileRevalidateStrategy<T>(url, cacheKey, cacheType, options);
      
      default:
        throw new Error(`Unknown cache strategy: ${config.strategy}`);
    }
  }

  // Private methods
  private async cacheFirstStrategy<T>(
    url: string,
    cacheKey: string,
    cacheType: keyof typeof CACHE_CONFIGS,
    options?: RequestInit
  ): Promise<T> {
    // Try cache first
    const cached = await this.get<T>(cacheKey, cacheType);
    if (cached !== null) {
      return cached;
    }
    
    // Fallback to network
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as T;
    await this.set(cacheKey, data, cacheType, response.headers.get('etag') || undefined);
    
    return data;
  }

  private async networkFirstStrategy<T>(
    url: string,
    cacheKey: string,
    cacheType: keyof typeof CACHE_CONFIGS,
    options?: RequestInit
  ): Promise<T> {
    try {
      // Try network first
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json() as T;
      await this.set(cacheKey, data, cacheType, response.headers.get('etag') || undefined);
      
      return data;
    } catch (error) {
      // Fallback to cache
      const cached = await this.get<T>(cacheKey, cacheType);
      if (cached !== null) {
        return cached;
      }
      
      throw error;
    }
  }

  private async staleWhileRevalidateStrategy<T>(
    url: string,
    cacheKey: string,
    cacheType: keyof typeof CACHE_CONFIGS,
    options?: RequestInit
  ): Promise<T> {
    // Get cached version immediately
    const cached = await this.get<T>(cacheKey, cacheType);
    
    // Start background update
    this.backgroundUpdate(url, cacheKey, cacheType, options)
      .catch(error => console.warn('Background update failed:', error));
    
    if (cached !== null) {
      return cached;
    }
    
    // If no cache, wait for network
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as T;
    await this.set(cacheKey, data, cacheType, response.headers.get('etag') || undefined);
    
    return data;
  }

  private async backgroundUpdate(
    url: string,
    cacheKey: string,
    cacheType: keyof typeof CACHE_CONFIGS,
    options?: RequestInit
  ): Promise<void> {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        await this.set(cacheKey, data, cacheType, response.headers.get('etag') || undefined);
      }
    } catch (error) {
      // Silent fail for background updates
      console.debug('Background update failed:', error);
    }
  }

  private generateCacheKey(url: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body || '';
    return `${method}_${url}_${typeof body === 'string' ? body : JSON.stringify(body)}`;
  }

  private calculateSize(data: unknown): number {
    try {
      return new Blob([JSON.stringify(data)]).size;
    } catch {
      return 0;
    }
  }

  private async enforceMaxSize(cacheType: keyof typeof CACHE_CONFIGS): Promise<void> {
    const config = CACHE_CONFIGS[cacheType];
    const stats = await this.getStats(cacheType);
    
    if (stats.entryCount > config.maxSize) {
      await this.clearOldEntries(cacheType, stats.entryCount - config.maxSize);
    }
  }

  private async clearOldEntries(
    cacheType: keyof typeof CACHE_CONFIGS,
    count?: number
  ): Promise<void> {
    const config = CACHE_CONFIGS[cacheType];
    const prefix = `${this.storagePrefix}${config.name}_`;
    
    const entries: Array<{ key: string; timestamp: number }> = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const entry: CacheEntry = JSON.parse(stored);
            entries.push({ key, timestamp: entry.timestamp });
          }
        } catch (error) {
          // Invalid entry, mark for removal
          entries.push({ key, timestamp: 0 });
        }
      }
    }
    
    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove specified count or half of entries
    const removeCount = count || Math.floor(entries.length / 2);
    for (let i = 0; i < removeCount && i < entries.length; i++) {
      localStorage.removeItem(entries[i].key);
    }
  }
}

// Singleton instance export
export const advancedCacheManager = AdvancedCacheManager.getInstance();
