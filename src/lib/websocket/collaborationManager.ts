/**
 * Real-time Collaboration Manager
 * TypeScript best practices ile gerçek zamanlı işbirliği sistemi
 */

import { websocketManager } from './websocketManager';

// Types
export interface CollaborationUser {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly role: string;
  readonly status: 'online' | 'away' | 'busy' | 'offline';
  readonly lastSeen: Date;
  readonly currentPage?: string;
  readonly currentAction?: string;
}

export interface TypingIndicator {
  readonly userId: string;
  readonly userName: string;
  readonly roomId: string;
  readonly isTyping: boolean;
  readonly timestamp: Date;
}

export interface UserActivity {
  readonly userId: string;
  readonly userName: string;
  readonly action: 'viewing' | 'editing' | 'creating' | 'deleting';
  readonly resource: {
    readonly type: string;
    readonly id: string;
    readonly name: string;
  };
  readonly timestamp: Date;
  readonly metadata?: Record<string, unknown>;
}

export interface CollaborationRoom {
  readonly id: string;
  readonly name: string;
  readonly type: 'document' | 'module' | 'meeting' | 'general';
  readonly users: readonly CollaborationUser[];
  readonly activities: readonly UserActivity[];
  readonly createdAt: Date;
  readonly metadata?: Record<string, unknown>;
}

export interface CursorPosition {
  readonly userId: string;
  readonly userName: string;
  readonly x: number;
  readonly y: number;
  readonly elementId?: string;
  readonly timestamp: Date;
}

export interface DocumentEdit {
  readonly id: string;
  readonly userId: string;
  readonly userName: string;
  readonly operation: 'insert' | 'delete' | 'replace' | 'format';
  readonly position: number;
  readonly content: string;
  readonly previousContent?: string;
  readonly timestamp: Date;
}

// Collaboration events
export const COLLABORATION_EVENTS = {
  USER_JOINED: 'collaboration:user_joined',
  USER_LEFT: 'collaboration:user_left',
  USER_STATUS_CHANGED: 'collaboration:user_status_changed',
  TYPING_START: 'collaboration:typing_start',
  TYPING_STOP: 'collaboration:typing_stop',
  CURSOR_MOVED: 'collaboration:cursor_moved',
  DOCUMENT_EDITED: 'collaboration:document_edited',
  ACTIVITY_LOGGED: 'collaboration:activity_logged',
  ROOM_CREATED: 'collaboration:room_created',
  ROOM_UPDATED: 'collaboration:room_updated'
} as const;

export class CollaborationManager {
  private static instance: CollaborationManager;
  private currentUser: CollaborationUser | null = null;
  private rooms = new Map<string, CollaborationRoom>();
  private activeUsers = new Map<string, CollaborationUser>();
  private typingIndicators = new Map<string, TypingIndicator>();
  private cursorPositions = new Map<string, CursorPosition>();
  private currentRoom: string | null = null;
  
  private typingTimer: NodeJS.Timeout | null = null;
  private cursorUpdateThrottle: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  
  private constructor() {
    // Singleton pattern
    this.setupEventListeners();
  }
  
  static getInstance(): CollaborationManager {
    if (!CollaborationManager.instance) {
      CollaborationManager.instance = new CollaborationManager();
    }
    return CollaborationManager.instance;
  }

  /**
   * İşbirliği sistemini başlat
   */
  async initialize(user: Omit<CollaborationUser, 'status' | 'lastSeen'>): Promise<void> {
    this.currentUser = {
      ...user,
      status: 'online',
      lastSeen: new Date()
    };

    // Setup user presence heartbeat
    this.startPresenceHeartbeat();
    
    // Notify others of user joining
    websocketManager.send('user:presence', {
      user: this.currentUser,
      action: 'join'
    });

    console.log('✅ Collaboration manager initialized');
  }

  /**
   * Odaya katıl
   */
  async joinRoom(roomId: string, roomName?: string, roomType: CollaborationRoom['type'] = 'general'): Promise<void> {
    if (!this.currentUser) {
      throw new Error('User not initialized');
    }

    // Leave current room if any
    if (this.currentRoom) {
      await this.leaveRoom();
    }

    this.currentRoom = roomId;
    
    // Join WebSocket room
    websocketManager.joinRoom(roomId, this.currentUser.id);
    
    // Send join event
    websocketManager.send(COLLABORATION_EVENTS.USER_JOINED, {
      roomId,
      user: this.currentUser,
      timestamp: Date.now()
    }, { roomId });

    // Create or update room
    if (!this.rooms.has(roomId)) {
      const room: CollaborationRoom = {
        id: roomId,
        name: roomName || roomId,
        type: roomType,
        users: [this.currentUser],
        activities: [],
        createdAt: new Date()
      };
      this.rooms.set(roomId, room);
    }

    console.log(`👥 Joined collaboration room: ${roomId}`);
  }

  /**
   * Odadan ayrıl
   */
  async leaveRoom(): Promise<void> {
    if (!this.currentRoom || !this.currentUser) return;

    const roomId = this.currentRoom;
    
    // Send leave event
    websocketManager.send(COLLABORATION_EVENTS.USER_LEFT, {
      roomId,
      user: this.currentUser,
      timestamp: Date.now()
    }, { roomId });

    // Leave WebSocket room
    websocketManager.leaveRoom(roomId, this.currentUser.id);
    
    // Stop typing if typing
    this.stopTyping();
    
    this.currentRoom = null;
    
    console.log(`👋 Left collaboration room: ${roomId}`);
  }

  /**
   * Kullanıcı durumunu güncelle
   */
  updateUserStatus(status: CollaborationUser['status']): void {
    if (!this.currentUser) return;
    
    this.currentUser = { ...this.currentUser, status, lastSeen: new Date() };
    
    websocketManager.send(COLLABORATION_EVENTS.USER_STATUS_CHANGED, {
      userId: this.currentUser.id,
      status,
      timestamp: Date.now()
    });
  }

  /**
   * Typing indicator başlat
   */
  startTyping(elementId?: string): void {
    if (!this.currentRoom || !this.currentUser) return;

    // Clear existing timer
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }

    // Send typing start event
    websocketManager.send(COLLABORATION_EVENTS.TYPING_START, {
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      roomId: this.currentRoom,
      elementId,
      timestamp: Date.now()
    }, { roomId: this.currentRoom });

    // Auto-stop typing after 3 seconds of inactivity
    this.typingTimer = setTimeout(() => {
      this.stopTyping();
    }, 3000);
  }

  /**
   * Typing indicator durdur
   */
  stopTyping(): void {
    if (!this.currentRoom || !this.currentUser) return;

    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }

    websocketManager.send(COLLABORATION_EVENTS.TYPING_STOP, {
      userId: this.currentUser.id,
      roomId: this.currentRoom,
      timestamp: Date.now()
    }, { roomId: this.currentRoom });
  }

  /**
   * İmleç pozisyonunu güncelle (throttled)
   */
  updateCursorPosition(x: number, y: number, elementId?: string): void {
    if (!this.currentRoom || !this.currentUser) return;

    // Throttle cursor updates to avoid spam
    if (this.cursorUpdateThrottle) {
      clearTimeout(this.cursorUpdateThrottle);
    }

    this.cursorUpdateThrottle = setTimeout(() => {
      websocketManager.send(COLLABORATION_EVENTS.CURSOR_MOVED, {
        userId: this.currentUser!.id,
        userName: this.currentUser!.name,
        x,
        y,
        elementId,
        timestamp: Date.now()
      }, { roomId: this.currentRoom! });
    }, 100); // Throttle to 10 updates per second
  }

  /**
   * Doküman düzenlemesi gönder
   */
  sendDocumentEdit(edit: Omit<DocumentEdit, 'id' | 'userId' | 'userName' | 'timestamp'>): void {
    if (!this.currentRoom || !this.currentUser) return;

    const documentEdit: DocumentEdit = {
      id: this.generateEditId(),
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      timestamp: new Date(),
      ...edit
    };

    websocketManager.send(COLLABORATION_EVENTS.DOCUMENT_EDITED, documentEdit, {
      roomId: this.currentRoom
    });
  }

  /**
   * Kullanıcı aktivitesi logla
   */
  logActivity(activity: Omit<UserActivity, 'userId' | 'userName' | 'timestamp'>): void {
    if (!this.currentUser) return;

    const fullActivity: UserActivity = {
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      timestamp: new Date(),
      ...activity
    };

    websocketManager.send(COLLABORATION_EVENTS.ACTIVITY_LOGGED, fullActivity, {
      roomId: this.currentRoom || undefined
    });

    // Add to current room activities
    if (this.currentRoom) {
      const room = this.rooms.get(this.currentRoom);
      if (room) {
        const updatedRoom: CollaborationRoom = {
          ...room,
          activities: [...room.activities, fullActivity].slice(-50) // Keep last 50 activities
        };
        this.rooms.set(this.currentRoom, updatedRoom);
      }
    }
  }

  /**
   * Aktif kullanıcıları al
   */
  getActiveUsers(): readonly CollaborationUser[] {
    return Array.from(this.activeUsers.values());
  }

  /**
   * Typing kullanıcıları al
   */
  getTypingUsers(roomId?: string): readonly TypingIndicator[] {
    const targetRoom = roomId || this.currentRoom;
    if (!targetRoom) return [];

    return Array.from(this.typingIndicators.values())
      .filter(indicator => 
        indicator.roomId === targetRoom && 
        indicator.userId !== this.currentUser?.id &&
        indicator.isTyping
      );
  }

  /**
   * İmleç pozisyonlarını al
   */
  getCursorPositions(): readonly CursorPosition[] {
    return Array.from(this.cursorPositions.values())
      .filter(cursor => cursor.userId !== this.currentUser?.id);
  }

  /**
   * Mevcut odayı al
   */
  getCurrentRoom(): CollaborationRoom | null {
    return this.currentRoom ? this.rooms.get(this.currentRoom) || null : null;
  }

  /**
   * Kullanıcı sayfa değiştirdiğinde çağır
   */
  onPageChange(pagePath: string): void {
    if (!this.currentUser) return;

    this.currentUser = { 
      ...this.currentUser, 
      currentPage: pagePath,
      lastSeen: new Date()
    };

    // Update presence
    websocketManager.send('user:presence', {
      user: this.currentUser,
      action: 'update'
    });
  }

  /**
   * Cleanup - sayfa kapatılırken çağır
   */
  destroy(): void {
    this.stopPresenceHeartbeat();
    
    if (this.currentRoom) {
      this.leaveRoom();
    }

    if (this.currentUser) {
      websocketManager.send('user:presence', {
        user: this.currentUser,
        action: 'leave'
      });
    }

    console.log('🧹 Collaboration manager destroyed');
  }

  // Private methods
  private setupEventListeners(): void {
    // User events
    websocketManager.on(COLLABORATION_EVENTS.USER_JOINED, (data: any) => {
      this.handleUserJoined(data);
    });

    websocketManager.on(COLLABORATION_EVENTS.USER_LEFT, (data: any) => {
      this.handleUserLeft(data);
    });

    websocketManager.on(COLLABORATION_EVENTS.USER_STATUS_CHANGED, (data: any) => {
      this.handleUserStatusChanged(data);
    });

    // Typing events
    websocketManager.on(COLLABORATION_EVENTS.TYPING_START, (data: any) => {
      this.handleTypingStart(data);
    });

    websocketManager.on(COLLABORATION_EVENTS.TYPING_STOP, (data: any) => {
      this.handleTypingStop(data);
    });

    // Cursor events
    websocketManager.on(COLLABORATION_EVENTS.CURSOR_MOVED, (data: any) => {
      this.handleCursorMoved(data);
    });

    // Document events
    websocketManager.on(COLLABORATION_EVENTS.DOCUMENT_EDITED, (data: any) => {
      this.handleDocumentEdited(data);
    });

    // Activity events
    websocketManager.on(COLLABORATION_EVENTS.ACTIVITY_LOGGED, (data: any) => {
      this.handleActivityLogged(data);
    });
  }

  private handleUserJoined(data: any): void {
    const { user, roomId } = data;
    
    this.activeUsers.set(user.id, user);
    
    // Update room
    const room = this.rooms.get(roomId);
    if (room) {
      const updatedRoom: CollaborationRoom = {
        ...room,
        users: [...room.users.filter(u => u.id !== user.id), user]
      };
      this.rooms.set(roomId, updatedRoom);
    }
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:user-joined', {
      detail: { user, roomId }
    }));
  }

  private handleUserLeft(data: any): void {
    const { user, roomId } = data;
    
    this.activeUsers.delete(user.id);
    this.typingIndicators.delete(user.id);
    this.cursorPositions.delete(user.id);
    
    // Update room
    const room = this.rooms.get(roomId);
    if (room) {
      const updatedRoom: CollaborationRoom = {
        ...room,
        users: room.users.filter(u => u.id !== user.id)
      };
      this.rooms.set(roomId, updatedRoom);
    }
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:user-left', {
      detail: { user, roomId }
    }));
  }

  private handleUserStatusChanged(data: any): void {
    const { userId, status } = data;
    
    const user = this.activeUsers.get(userId);
    if (user) {
      const updatedUser: CollaborationUser = { ...user, status };
      this.activeUsers.set(userId, updatedUser);
    }
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:user-status-changed', {
      detail: { userId, status }
    }));
  }

  private handleTypingStart(data: any): void {
    const { userId, userName, roomId, elementId, timestamp } = data;
    
    // Skip own typing events
    if (userId === this.currentUser?.id) return;
    
    const typingIndicator: TypingIndicator = {
      userId,
      userName,
      roomId,
      isTyping: true,
      timestamp: new Date(timestamp)
    };
    
    this.typingIndicators.set(userId, typingIndicator);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:typing-start', {
      detail: { userId, userName, roomId, elementId }
    }));
  }

  private handleTypingStop(data: any): void {
    const { userId, roomId } = data;
    
    // Skip own typing events
    if (userId === this.currentUser?.id) return;
    
    this.typingIndicators.delete(userId);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:typing-stop', {
      detail: { userId, roomId }
    }));
  }

  private handleCursorMoved(data: any): void {
    const { userId, userName, x, y, elementId, timestamp } = data;
    
    // Skip own cursor events
    if (userId === this.currentUser?.id) return;
    
    const cursorPosition: CursorPosition = {
      userId,
      userName,
      x,
      y,
      elementId,
      timestamp: new Date(timestamp)
    };
    
    this.cursorPositions.set(userId, cursorPosition);
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:cursor-moved', {
      detail: cursorPosition
    }));
  }

  private handleDocumentEdited(data: DocumentEdit): void {
    // Skip own edit events
    if (data.userId === this.currentUser?.id) return;
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:document-edited', {
      detail: data
    }));
  }

  private handleActivityLogged(data: UserActivity): void {
    // Skip own activity events
    if (data.userId === this.currentUser?.id) return;
    
    // Emit custom event
    window.dispatchEvent(new CustomEvent('collaboration:activity-logged', {
      detail: data
    }));
  }

  private startPresenceHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.currentUser) {
        websocketManager.send('user:heartbeat', {
          userId: this.currentUser.id,
          timestamp: Date.now()
        });
      }
    }, 30000); // Every 30 seconds
  }

  private stopPresenceHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private generateEditId(): string {
    return `edit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance export
export const collaborationManager = CollaborationManager.getInstance();
