/**
 * WebSocket Hook
 * TypeScript best practices ile WebSocket state management
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { websocketManager, type ConnectionStatus } from '@/lib/websocket/websocketManager';
import { realtimeNotificationManager, type RealtimeNotification } from '@/lib/websocket/realtimeNotificationManager';
import { collaborationManager, type CollaborationUser, type TypingIndicator } from '@/lib/websocket/collaborationManager';

// Types
interface WebSocketState {
  readonly isConnected: boolean;
  readonly isConnecting: boolean;
  readonly connectionError?: string;
  readonly reconnectAttempts: number;
  readonly latency?: number;
}

interface WebSocketActions {
  readonly connect: (url?: string) => Promise<boolean>;
  readonly disconnect: () => void;
  readonly send: (event: string, data: unknown, options?: {
    readonly userId?: string;
    readonly roomId?: string;
    readonly priority?: 'low' | 'medium' | 'high';
  }) => boolean;
  readonly on: (event: string, callback: (data: unknown) => void) => void;
  readonly off: (event: string, callback?: (data: unknown) => void) => void;
  readonly measureLatency: () => Promise<number>;
}

export function useWebSocket(): WebSocketState & WebSocketActions {
  // State
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isConnecting: false,
    reconnectAttempts: 0
  });

  // Actions
  const connect = useCallback(async (url?: string): Promise<boolean> => {
    return await websocketManager.connect(url);
  }, []);

  const disconnect = useCallback((): void => {
    websocketManager.disconnect();
  }, []);

  const send = useCallback((
    event: string, 
    data: unknown, 
    options?: {
      readonly userId?: string;
      readonly roomId?: string;
      readonly priority?: 'low' | 'medium' | 'high';
    }
  ): boolean => {
    return websocketManager.send(event, data, options);
  }, []);

  const on = useCallback((event: string, callback: (data: unknown) => void): void => {
    websocketManager.on(event, callback);
  }, []);

  const off = useCallback((event: string, callback?: (data: unknown) => void): void => {
    websocketManager.off(event, callback);
  }, []);

  const measureLatency = useCallback(async (): Promise<number> => {
    return await websocketManager.measureLatency();
  }, []);

  // Effects
  useEffect(() => {
    // Poll connection status periodically
    const updateStatus = () => {
      const status = websocketManager.getConnectionStatus();
      setConnectionStatus(status);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  // Memoized state
  const state = useMemo(() => ({
    isConnected: connectionStatus.isConnected,
    isConnecting: connectionStatus.isConnecting,
    connectionError: connectionStatus.connectionError,
    reconnectAttempts: connectionStatus.reconnectAttempts,
    latency: connectionStatus.latency
  }), [connectionStatus]);

  // Memoized actions
  const actions = useMemo(() => ({
    connect,
    disconnect,
    send,
    on,
    off,
    measureLatency
  }), [connect, disconnect, send, on, off, measureLatency]);

  return { ...state, ...actions };
}

// Specialized hooks
export function useRealtimeNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<readonly RealtimeNotification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize notification manager
  useEffect(() => {
    if (userId && !isInitialized) {
      realtimeNotificationManager.initialize(userId).then(() => {
        setIsInitialized(true);
      });
    }
  }, [userId, isInitialized]);

  // Listen for new notifications
  useEffect(() => {
    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent;
      const notification: RealtimeNotification = customEvent.detail;
      setNotifications(prev => [notification, ...prev]);
    };

    window.addEventListener('realtime-notification', handleNotification);
    return () => window.removeEventListener('realtime-notification', handleNotification);
  }, []);

  const sendNotification = useCallback(async (
    notification: Omit<RealtimeNotification, 'id' | 'timestamp'>
  ): Promise<string> => {
    return await realtimeNotificationManager.sendNotification(notification);
  }, []);

  const dismissNotification = useCallback((notificationId: string): void => {
    realtimeNotificationManager.dismissNotification(notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback((): void => {
    realtimeNotificationManager.clearAllNotifications();
    setNotifications([]);
  }, []);

  return useMemo(() => ({
    notifications,
    isInitialized,
    sendNotification,
    dismissNotification,
    clearAllNotifications
  }), [notifications, isInitialized, sendNotification, dismissNotification, clearAllNotifications]);
}

export function useCollaboration(user?: Omit<CollaborationUser, 'status' | 'lastSeen'>) {
  const [activeUsers, setActiveUsers] = useState<readonly CollaborationUser[]>([]);
  const [typingUsers, setTypingUsers] = useState<readonly TypingIndicator[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  // Initialize collaboration manager
  useEffect(() => {
    if (user && !isInitialized) {
      collaborationManager.initialize(user).then(() => {
        setIsInitialized(true);
      });
    }
  }, [user, isInitialized]);

  // Listen for collaboration events
  useEffect(() => {
    const handleUserJoined = (_event: Event) => {
      setActiveUsers(collaborationManager.getActiveUsers());
    };

    const handleUserLeft = (_event: Event) => {
      setActiveUsers(collaborationManager.getActiveUsers());
    };

    const handleTypingStart = (_event: Event) => {
      setTypingUsers(collaborationManager.getTypingUsers());
    };

    const handleTypingStop = (_event: Event) => {
      setTypingUsers(collaborationManager.getTypingUsers());
    };

    window.addEventListener('collaboration:user-joined', handleUserJoined);
    window.addEventListener('collaboration:user-left', handleUserLeft);
    window.addEventListener('collaboration:typing-start', handleTypingStart);
    window.addEventListener('collaboration:typing-stop', handleTypingStop);

    return () => {
      window.removeEventListener('collaboration:user-joined', handleUserJoined);
      window.removeEventListener('collaboration:user-left', handleUserLeft);
      window.removeEventListener('collaboration:typing-start', handleTypingStart);
      window.removeEventListener('collaboration:typing-stop', handleTypingStop);
    };
  }, []);

  // Actions
  const joinRoom = useCallback(async (roomId: string, roomName?: string): Promise<void> => {
    await collaborationManager.joinRoom(roomId, roomName);
    setCurrentRoom(roomId);
    setActiveUsers(collaborationManager.getActiveUsers());
  }, []);

  const leaveRoom = useCallback(async (): Promise<void> => {
    await collaborationManager.leaveRoom();
    setCurrentRoom(null);
    setActiveUsers([]);
    setTypingUsers([]);
  }, []);

  const startTyping = useCallback((elementId?: string): void => {
    collaborationManager.startTyping(elementId);
  }, []);

  const stopTyping = useCallback((): void => {
    collaborationManager.stopTyping();
  }, []);

  const updateUserStatus = useCallback((status: CollaborationUser['status']): void => {
    collaborationManager.updateUserStatus(status);
  }, []);

  const logActivity = useCallback((activity: {
    readonly action: 'viewing' | 'editing' | 'creating' | 'deleting';
    readonly resource: {
      readonly type: string;
      readonly id: string;
      readonly name: string;
    };
    readonly metadata?: Record<string, unknown>;
  }): void => {
    collaborationManager.logActivity(activity);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isInitialized) {
        collaborationManager.destroy();
      }
    };
  }, [isInitialized]);

  return useMemo(() => ({
    activeUsers,
    typingUsers,
    currentRoom,
    isInitialized,
    joinRoom,
    leaveRoom,
    startTyping,
    stopTyping,
    updateUserStatus,
    logActivity
  }), [
    activeUsers,
    typingUsers,
    currentRoom,
    isInitialized,
    joinRoom,
    leaveRoom,
    startTyping,
    stopTyping,
    updateUserStatus,
    logActivity
  ]);
}

export function useTypingIndicator(roomId?: string) {
  const [typingUsers, setTypingUsers] = useState<readonly TypingIndicator[]>([]);

  useEffect(() => {
    const updateTypingUsers = () => {
      setTypingUsers(collaborationManager.getTypingUsers(roomId));
    };

    const handleTypingStart = () => updateTypingUsers();
    const handleTypingStop = () => updateTypingUsers();

    window.addEventListener('collaboration:typing-start', handleTypingStart);
    window.addEventListener('collaboration:typing-stop', handleTypingStop);

    // Initial load
    updateTypingUsers();

    return () => {
      window.removeEventListener('collaboration:typing-start', handleTypingStart);
      window.removeEventListener('collaboration:typing-stop', handleTypingStop);
    };
  }, [roomId]);

  const startTyping = useCallback((elementId?: string): void => {
    collaborationManager.startTyping(elementId);
  }, []);

  const stopTyping = useCallback((): void => {
    collaborationManager.stopTyping();
  }, []);

  return useMemo(() => ({
    typingUsers,
    startTyping,
    stopTyping,
    isAnyoneTyping: typingUsers.length > 0
  }), [typingUsers, startTyping, stopTyping]);
}

export function useRealtimeData<T>(
  event: string,
  initialData?: T
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { on, off } = useWebSocket();

  useEffect(() => {
    const handleUpdate = (newData: unknown) => {
      setData(newData as T);
      setLastUpdated(new Date());
    };

    on(event, handleUpdate);

    return () => {
      off(event, handleUpdate);
    };
  }, [event, on, off]);

  return useMemo(() => ({
    data,
    lastUpdated,
    isDataAvailable: data !== undefined
  }), [data, lastUpdated]);
}
