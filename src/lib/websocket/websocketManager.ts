/**
 * Advanced WebSocket Manager
 * TypeScript best practices ile gerçek zamanlı bağlantı yönetimi
 */

// Types - Immutable ve type-safe
export interface WebSocketConfig {
  readonly url: string;
  readonly reconnectInterval: number;
  readonly maxReconnectAttempts: number;
  readonly heartbeatInterval: number;
  readonly connectionTimeout: number;
  readonly enableHeartbeat: boolean;
  readonly enableReconnect: boolean;
}

export interface WebSocketMessage {
  readonly id: string;
  readonly type: string;
  readonly event: string;
  readonly data: unknown;
  readonly timestamp: number;
  readonly userId?: string;
  readonly roomId?: string;
}

export interface WebSocketEvent {
  readonly event: string;
  readonly callback: (data: unknown) => void;
  readonly once?: boolean;
}

export interface ConnectionStatus {
  readonly isConnected: boolean;
  readonly isConnecting: boolean;
  readonly lastConnected?: Date;
  readonly reconnectAttempts: number;
  readonly connectionError?: string;
  readonly latency?: number;
}

// WebSocket event types
export const WEBSOCKET_EVENTS = {
  // Connection events
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect',
  ERROR: 'error',
  
  // System events
  HEARTBEAT: 'heartbeat',
  PONG: 'pong',
  
  // Application events
  USER_JOINED: 'user:joined',
  USER_LEFT: 'user:left',
  USER_TYPING: 'user:typing',
  
  // Data events
  DATA_UPDATED: 'data:updated',
  NOTIFICATION: 'notification',
  MESSAGE_RECEIVED: 'message:received',
  
  // Real-time updates
  DONATION_CREATED: 'donation:created',
  BENEFICIARY_UPDATED: 'beneficiary:updated',
  MEETING_STARTED: 'meeting:started',
  TASK_ASSIGNED: 'task:assigned'
} as const;

// Default configuration
const DEFAULT_CONFIG: WebSocketConfig = {
  url: 'ws://localhost:3001',
  reconnectInterval: 3000,
  maxReconnectAttempts: 10,
  heartbeatInterval: 30000,
  connectionTimeout: 10000,
  enableHeartbeat: true,
  enableReconnect: true
} as const;

export class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private events = new Map<string, Set<WebSocketEvent>>();
  private connectionStatus: ConnectionStatus = {
    isConnected: false,
    isConnecting: false,
    reconnectAttempts: 0
  };
  
  private reconnectTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private connectionTimer: NodeJS.Timeout | null = null;
  // private lastHeartbeat = 0;
  private messageQueue: readonly WebSocketMessage[] = [];
  
  private constructor(config: Partial<WebSocketConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }
  
  static getInstance(config?: Partial<WebSocketConfig>): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager(config);
    }
    return WebSocketManager.instance;
  }

  /**
   * WebSocket bağlantısı başlat
   */
  async connect(url?: string): Promise<boolean> {
    if (this.socket?.readyState === WebSocket.CONNECTING) {
      return new Promise((resolve) => {
        this.once(WEBSOCKET_EVENTS.CONNECT, () => resolve(true));
        this.once(WEBSOCKET_EVENTS.ERROR, () => resolve(false));
      });
    }

    if (this.socket?.readyState === WebSocket.OPEN) {
      return true;
    }

    const connectUrl = url || this.config.url;
    
    this.updateConnectionStatus({
      isConnecting: true,
      connectionError: undefined
    });

    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(connectUrl);
        
        // Connection timeout
        this.connectionTimer = setTimeout(() => {
          if (this.socket?.readyState === WebSocket.CONNECTING) {
            this.socket.close();
            this.updateConnectionStatus({
              isConnecting: false,
              connectionError: 'Connection timeout'
            });
            reject(new Error('Connection timeout'));
          }
        }, this.config.connectionTimeout);

        this.socket.onopen = () => {
          if (this.connectionTimer) {
            clearTimeout(this.connectionTimer);
            this.connectionTimer = null;
          }
          
          this.updateConnectionStatus({
            isConnected: true,
            isConnecting: false,
            lastConnected: new Date(),
            reconnectAttempts: 0,
            connectionError: undefined
          });
          
          this.startHeartbeat();
          this.processMessageQueue();
          this.emit(WEBSOCKET_EVENTS.CONNECT, { timestamp: Date.now() });
          
          resolve(true);
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event);
        };

        this.socket.onclose = (event) => {
          this.handleClose(event);
        };

        this.socket.onerror = (error) => {
          if (this.connectionTimer) {
            clearTimeout(this.connectionTimer);
            this.connectionTimer = null;
          }
          
          this.updateConnectionStatus({
            isConnecting: false,
            connectionError: 'Connection failed'
          });
          
          this.emit(WEBSOCKET_EVENTS.ERROR, { error, timestamp: Date.now() });
          reject(error);
        };

      } catch (error) {
        this.updateConnectionStatus({
          isConnecting: false,
          connectionError: error instanceof Error ? error.message : 'Unknown error'
        });
        reject(error);
      }
    });
  }

  /**
   * WebSocket bağlantısını kapat
   */
  disconnect(): void {
    this.stopHeartbeat();
    this.stopReconnect();
    
    if (this.socket) {
      this.socket.close(1000, 'User disconnected');
      this.socket = null;
    }
    
    this.updateConnectionStatus({
      isConnected: false,
      isConnecting: false
    });
  }

  /**
   * Event listener ekle
   */
  on(event: string, callback: (data: unknown) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    const eventObj: WebSocketEvent = { event, callback };
    this.events.get(event)!.add(eventObj);
  }

  /**
   * Tek seferlik event listener ekle
   */
  once(event: string, callback: (data: unknown) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    
    const eventObj: WebSocketEvent = { event, callback, once: true };
    this.events.get(event)!.add(eventObj);
  }

  /**
   * Event listener kaldır
   */
  off(event: string, callback?: (data: unknown) => void): void {
    const eventSet = this.events.get(event);
    if (!eventSet) return;

    if (callback) {
      for (const eventObj of eventSet) {
        if (eventObj.callback === callback) {
          eventSet.delete(eventObj);
          break;
        }
      }
    } else {
      eventSet.clear();
    }

    if (eventSet.size === 0) {
      this.events.delete(event);
    }
  }

  /**
   * Event emit
   */
  emit(event: string, data: unknown): void {
    const eventSet = this.events.get(event);
    if (!eventSet) return;

    const toRemove: WebSocketEvent[] = [];
    
    for (const eventObj of eventSet) {
      try {
        eventObj.callback(data);
        
        if (eventObj.once) {
          toRemove.push(eventObj);
        }
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    }
    
    // Remove once listeners
    toRemove.forEach(eventObj => eventSet.delete(eventObj));
  }

  /**
   * Mesaj gönder
   */
  send(event: string, data: unknown, options: {
    readonly userId?: string;
    readonly roomId?: string;
    readonly priority?: 'low' | 'medium' | 'high';
  } = {}): boolean {
    const message: WebSocketMessage = {
      id: this.generateMessageId(),
      type: 'message',
      event,
      data,
      timestamp: Date.now(),
      userId: options.userId,
      roomId: options.roomId
    };

    if (this.socket?.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Failed to send message:', error);
        this.queueMessage(message);
        return false;
      }
    } else {
      this.queueMessage(message);
      return false;
    }
  }

  /**
   * Oda'ya katıl
   */
  joinRoom(roomId: string, userId?: string): void {
    this.send('room:join', { roomId, userId });
  }

  /**
   * Oda'dan ayrıl
   */
  leaveRoom(roomId: string, userId?: string): void {
    this.send('room:leave', { roomId, userId });
  }

  /**
   * Typing indicator gönder
   */
  sendTyping(roomId: string, userId: string, isTyping: boolean): void {
    this.send(WEBSOCKET_EVENTS.USER_TYPING, { roomId, userId, isTyping });
  }

  /**
   * Bağlantı durumunu al
   */
  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  /**
   * Latency ölç
   */
  async measureLatency(): Promise<number> {
    if (!this.connectionStatus.isConnected) {
      return -1;
    }

    const startTime = Date.now();
    
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve(-1);
      }, 5000);

      this.once('pong', () => {
        clearTimeout(timeout);
        const latency = Date.now() - startTime;
        this.updateConnectionStatus({ latency });
        resolve(latency);
      });

      this.send('ping', { timestamp: startTime });
    });
  }

  // Private methods
  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Handle system messages
      if (message.event === 'pong') {
        // this.lastHeartbeat = Date.now();
        this.emit('pong', message.data);
        return;
      }
      
      // Emit the event
      this.emit(message.event, message.data);
      
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  private handleClose(event: CloseEvent): void {
    this.stopHeartbeat();
    
    this.updateConnectionStatus({
      isConnected: false,
      isConnecting: false,
      connectionError: event.reason || 'Connection closed'
    });
    
    this.emit(WEBSOCKET_EVENTS.DISCONNECT, {
      code: event.code,
      reason: event.reason,
      timestamp: Date.now()
    });
    
    // Auto-reconnect if enabled
    if (this.config.enableReconnect && event.code !== 1000) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.connectionStatus.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }

    this.updateConnectionStatus({
      reconnectAttempts: this.connectionStatus.reconnectAttempts + 1
    });

    this.reconnectTimer = setTimeout(() => {
      console.log(`Attempting to reconnect (${this.connectionStatus.reconnectAttempts}/${this.config.maxReconnectAttempts})`);
      this.connect().catch(() => {
        this.scheduleReconnect();
      });
    }, this.config.reconnectInterval);
  }

  private stopReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private startHeartbeat(): void {
    if (!this.config.enableHeartbeat) return;

    this.heartbeatTimer = setInterval(() => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.send('ping', { timestamp: Date.now() });
      }
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private queueMessage(message: WebSocketMessage): void {
    // Add to queue (max 100 messages)
    this.messageQueue = [...this.messageQueue, message].slice(-100);
  }

  private processMessageQueue(): void {
    const queue = [...this.messageQueue];
    this.messageQueue = [];
    
    queue.forEach(message => {
      if (this.socket?.readyState === WebSocket.OPEN) {
        try {
          this.socket.send(JSON.stringify(message));
        } catch (error) {
          console.error('Failed to send queued message:', error);
        }
      }
    });
  }

  private updateConnectionStatus(updates: Partial<ConnectionStatus>): void {
    this.connectionStatus = { ...this.connectionStatus, ...updates };
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      // Page is hidden - reduce heartbeat frequency
      this.stopHeartbeat();
    } else {
      // Page is visible - resume normal heartbeat
      if (this.connectionStatus.isConnected) {
        this.startHeartbeat();
      }
    }
  }

  private handleOnline(): void {
    // Back online - try to reconnect if needed
    if (!this.connectionStatus.isConnected && !this.connectionStatus.isConnecting) {
      this.connect().catch(console.error);
    }
  }

  private handleOffline(): void {
    // Gone offline - stop heartbeat but keep connection for when back online
    this.stopHeartbeat();
  }
}

// Singleton instance export
export const websocketManager = WebSocketManager.getInstance();
