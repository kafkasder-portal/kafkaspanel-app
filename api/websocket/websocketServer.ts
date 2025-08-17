/**
 * WebSocket Server Implementation
 * TypeScript best practices ile backend WebSocket server
 */

import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';

// Types
interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  userRole?: string;
  rooms?: Set<string>;
  lastHeartbeat?: number;
}

interface WebSocketMessage {
  id: string;
  type: string;
  event: string;
  data: any;
  timestamp: number;
  userId?: string;
  roomId?: string;
}

interface Room {
  id: string;
  name: string;
  users: Set<string>;
  createdAt: Date;
}

// WebSocket Manager Class
class WebSocketManager {
  private clients = new Map<string, AuthenticatedWebSocket>();
  private rooms = new Map<string, Room>();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor(private wss: WebSocketServer) {
    this.setupHeartbeat();
  }

  /**
   * Initialize WebSocket connection
   */
  handleConnection(ws: AuthenticatedWebSocket, request: IncomingMessage) {
    console.log('🔌 New WebSocket connection');

    // Authenticate user from URL parameters or headers
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const token = url.searchParams.get('token') || request.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as any;
        ws.userId = decoded.id || decoded.userId;
        ws.userRole = decoded.role;
        ws.lastHeartbeat = Date.now();
        
        this.clients.set(ws.userId, ws);
        console.log(`✅ User ${ws.userId} authenticated and connected`);
        
        // Send welcome message
        this.sendToClient(ws.userId, 'connect', {
          message: 'Connected successfully',
          userId: ws.userId,
          timestamp: Date.now()
        });
        
      } catch (error) {
        console.error('❌ Authentication failed:', error);
        ws.close(1008, 'Authentication failed');
        return;
      }
    } else {
      // Allow anonymous connections for development
      const anonymousId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      ws.userId = anonymousId;
      ws.userRole = 'anonymous';
      ws.lastHeartbeat = Date.now();
      
      this.clients.set(anonymousId, ws);
      console.log(`👤 Anonymous user ${anonymousId} connected`);
    }

    ws.rooms = new Set();

    // Setup message handling
    ws.on('message', (data: Buffer) => {
      this.handleMessage(ws, data);
    });

    // Handle disconnection
    ws.on('close', (code: number, reason: Buffer) => {
      this.handleDisconnection(ws, code, reason);
    });

    // Handle errors
    ws.on('error', (error: Error) => {
      console.error(`❌ WebSocket error for user ${ws.userId}:`, error);
    });

    // Send initial presence update
    this.broadcastPresenceUpdate(ws.userId!, 'online');
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(ws: AuthenticatedWebSocket, data: Buffer) {
    try {
      const message: WebSocketMessage = JSON.parse(data.toString());
      
      // Update heartbeat
      ws.lastHeartbeat = Date.now();
      
      console.log(`📨 Message from ${ws.userId}: ${message.event}`);
      
      // Handle different message types
      switch (message.event) {
        case 'ping':
          this.handlePing(ws, message);
          break;
          
        case 'room:join':
          this.handleRoomJoin(ws, message);
          break;
          
        case 'room:leave':
          this.handleRoomLeave(ws, message);
          break;
          
        case 'user:typing':
          this.handleTyping(ws, message);
          break;
          
        case 'user:presence':
          this.handlePresenceUpdate(ws, message);
          break;
          
        case 'collaboration:user_joined':
        case 'collaboration:typing_start':
        case 'collaboration:typing_stop':
        case 'collaboration:cursor_moved':
        case 'collaboration:document_edited':
        case 'collaboration:activity_logged':
          this.handleCollaborationEvent(ws, message);
          break;
          
        case 'donation:created':
        case 'beneficiary:updated':
        case 'meeting:started':
        case 'task:assigned':
          this.handleSystemEvent(ws, message);
          break;
          
        default:
          this.handleCustomEvent(ws, message);
      }
      
    } catch (error) {
      console.error('❌ Error parsing message:', error);
      this.sendError(ws, 'Invalid message format');
    }
  }

  /**
   * Handle ping messages
   */
  private handlePing(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    this.sendToClient(ws.userId!, 'pong', {
      timestamp: Date.now(),
      originalTimestamp: message.data?.timestamp
    });
  }

  /**
   * Handle room join
   */
  private handleRoomJoin(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    const { roomId, roomName } = message.data;
    
    if (!roomId) {
      this.sendError(ws, 'Room ID is required');
      return;
    }

    // Create room if it doesn't exist
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        id: roomId,
        name: roomName || roomId,
        users: new Set(),
        createdAt: new Date()
      });
    }

    const room = this.rooms.get(roomId)!;
    room.users.add(ws.userId!);
    ws.rooms!.add(roomId);

    console.log(`👥 User ${ws.userId} joined room ${roomId}`);

    // Notify other users in the room
    this.broadcastToRoom(roomId, 'collaboration:user_joined', {
      user: {
        id: ws.userId,
        name: ws.userId, // Would come from database
        role: ws.userRole,
        status: 'online'
      },
      roomId,
      timestamp: Date.now()
    }, ws.userId);

    // Send current room users to the joining user
    const roomUsers = Array.from(room.users).map(userId => ({
      id: userId,
      name: userId,
      role: this.clients.get(userId)?.userRole || 'user',
      status: 'online'
    }));

    this.sendToClient(ws.userId!, 'room:joined', {
      roomId,
      roomName: room.name,
      users: roomUsers,
      timestamp: Date.now()
    });
  }

  /**
   * Handle room leave
   */
  private handleRoomLeave(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    const { roomId } = message.data;
    
    if (!roomId || !ws.rooms!.has(roomId)) {
      return;
    }

    const room = this.rooms.get(roomId);
    if (room) {
      room.users.delete(ws.userId!);
      ws.rooms!.delete(roomId);

      console.log(`👋 User ${ws.userId} left room ${roomId}`);

      // Notify other users
      this.broadcastToRoom(roomId, 'collaboration:user_left', {
        user: {
          id: ws.userId,
          name: ws.userId,
          role: ws.userRole
        },
        roomId,
        timestamp: Date.now()
      }, ws.userId);

      // Clean up empty rooms
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  /**
   * Handle typing indicators
   */
  private handleTyping(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    const { roomId, isTyping } = message.data;
    
    if (!roomId) return;

    const event = isTyping ? 'collaboration:typing_start' : 'collaboration:typing_stop';
    
    this.broadcastToRoom(roomId, event, {
      userId: ws.userId,
      userName: ws.userId,
      roomId,
      isTyping,
      timestamp: Date.now()
    }, ws.userId);
  }

  /**
   * Handle presence updates
   */
  private handlePresenceUpdate(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    const { action, user } = message.data;
    
    if (action === 'update' && user) {
      // Update user status
      console.log(`👤 User ${ws.userId} status updated`);
      
      // Broadcast to all rooms user is in
      ws.rooms!.forEach(roomId => {
        this.broadcastToRoom(roomId, 'collaboration:user_status_changed', {
          userId: ws.userId,
          status: user.status || 'online',
          timestamp: Date.now()
        }, ws.userId);
      });
    }
  }

  /**
   * Handle collaboration events
   */
  private handleCollaborationEvent(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    const { roomId } = message.data;
    
    if (roomId) {
      // Broadcast to room
      this.broadcastToRoom(roomId, message.event, message.data, ws.userId);
    } else {
      // Broadcast to all rooms user is in
      ws.rooms!.forEach(room => {
        this.broadcastToRoom(room, message.event, message.data, ws.userId);
      });
    }
  }

  /**
   * Handle system events (notifications)
   */
  private handleSystemEvent(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    console.log(`🔔 System event: ${message.event}`);
    
    // Broadcast to all connected users
    this.broadcast(message.event, message.data, ws.userId);
  }

  /**
   * Handle custom events
   */
  private handleCustomEvent(ws: AuthenticatedWebSocket, message: WebSocketMessage) {
    console.log(`🔧 Custom event: ${message.event}`);
    
    // Echo back to sender for testing
    this.sendToClient(ws.userId!, `${message.event}:response`, {
      ...message.data,
      processed: true,
      timestamp: Date.now()
    });
  }

  /**
   * Handle disconnection
   */
  private handleDisconnection(ws: AuthenticatedWebSocket, code: number, reason: Buffer) {
    if (!ws.userId) return;

    console.log(`👋 User ${ws.userId} disconnected (${code}): ${reason.toString()}`);

    // Leave all rooms
    if (ws.rooms) {
      ws.rooms.forEach(roomId => {
        const room = this.rooms.get(roomId);
        if (room) {
          room.users.delete(ws.userId!);
          
          // Notify others in room
          this.broadcastToRoom(roomId, 'collaboration:user_left', {
            user: {
              id: ws.userId,
              name: ws.userId,
              role: ws.userRole
            },
            roomId,
            timestamp: Date.now()
          }, ws.userId);

          // Clean up empty rooms
          if (room.users.size === 0) {
            this.rooms.delete(roomId);
          }
        }
      });
    }

    // Remove from clients
    this.clients.delete(ws.userId);
    
    // Broadcast presence update
    this.broadcastPresenceUpdate(ws.userId, 'offline');
  }

  /**
   * Send message to specific client
   */
  private sendToClient(userId: string, event: string, data: any) {
    const client = this.clients.get(userId);
    if (client && client.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        id: this.generateMessageId(),
        type: 'message',
        event,
        data,
        timestamp: Date.now()
      };
      
      client.send(JSON.stringify(message));
    }
  }

  /**
   * Broadcast to all clients in a room
   */
  private broadcastToRoom(roomId: string, event: string, data: any, excludeUserId?: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const message: WebSocketMessage = {
      id: this.generateMessageId(),
      type: 'message',
      event,
      data,
      timestamp: Date.now(),
      roomId
    };

    room.users.forEach(userId => {
      if (userId !== excludeUserId) {
        const client = this.clients.get(userId);
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      }
    });
  }

  /**
   * Broadcast to all connected clients
   */
  private broadcast(event: string, data: any, excludeUserId?: string) {
    const message: WebSocketMessage = {
      id: this.generateMessageId(),
      type: 'broadcast',
      event,
      data,
      timestamp: Date.now()
    };

    this.clients.forEach((client, userId) => {
      if (userId !== excludeUserId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  /**
   * Broadcast presence update
   */
  private broadcastPresenceUpdate(userId: string, status: 'online' | 'offline') {
    this.broadcast('user:presence', {
      userId,
      status,
      timestamp: Date.now()
    }, userId);
  }

  /**
   * Send error message
   */
  private sendError(ws: AuthenticatedWebSocket, message: string) {
    this.sendToClient(ws.userId!, 'error', {
      message,
      timestamp: Date.now()
    });
  }

  /**
   * Setup heartbeat system
   */
  private setupHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const timeout = 60000; // 60 seconds

      this.clients.forEach((client, userId) => {
        if (client.lastHeartbeat && (now - client.lastHeartbeat) > timeout) {
          console.log(`💔 Heartbeat timeout for user ${userId}`);
          client.terminate();
          this.clients.delete(userId);
        }
      });
    }, 30000); // Check every 30 seconds
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get server statistics
   */
  getStats() {
    return {
      connectedClients: this.clients.size,
      activeRooms: this.rooms.size,
      totalRoomUsers: Array.from(this.rooms.values()).reduce((sum, room) => sum + room.users.size, 0)
    };
  }

  /**
   * Cleanup on server shutdown
   */
  cleanup() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    // Close all connections
    this.clients.forEach(client => {
      client.close(1001, 'Server shutdown');
    });
  }
}

// Initialize WebSocket server
export function initializeWebSocket(wss: WebSocketServer) {
  const manager = new WebSocketManager(wss);

  wss.on('connection', (ws: AuthenticatedWebSocket, request: IncomingMessage) => {
    manager.handleConnection(ws, request);
  });

  // Cleanup on process exit
  process.on('SIGTERM', () => {
    console.log('🧹 Cleaning up WebSocket connections...');
    manager.cleanup();
  });

  process.on('SIGINT', () => {
    console.log('🧹 Cleaning up WebSocket connections...');
    manager.cleanup();
  });

  console.log('✅ WebSocket server initialized');
  
  return manager;
}
