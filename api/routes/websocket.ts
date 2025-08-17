/**
 * WebSocket REST API Routes
 * WebSocket server için REST endpoints
 */

import { Router } from 'express';
import { WebSocketServer } from 'ws';

const router = Router();

// WebSocket server reference (will be set from main server)
let wss: WebSocketServer | null = null;

export function setWebSocketServer(websocketServer: WebSocketServer) {
  wss = websocketServer;
}

/**
 * GET /api/websocket/status
 * WebSocket server durumunu kontrol et
 */
router.get('/status', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const clients = Array.from(wss.clients);
  const connectedClients = clients.filter(ws => ws.readyState === 1).length;

  res.json({
    success: true,
    data: {
      status: 'running',
      connectedClients,
      totalClients: clients.length,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * POST /api/websocket/broadcast
 * Tüm bağlı kullanıcılara mesaj gönder
 */
router.post('/broadcast', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const { event, data, excludeUserId } = req.body;

  if (!event) {
    return res.status(400).json({
      success: false,
      message: 'Event is required'
    });
  }

  const message = {
    id: `broadcast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'broadcast',
    event,
    data: data || {},
    timestamp: Date.now()
  };

  let sentCount = 0;
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      // Check if this client should be excluded
      const clientUserId = (client as any).userId;
      if (!excludeUserId || clientUserId !== excludeUserId) {
        client.send(JSON.stringify(message));
        sentCount++;
      }
    }
  });

  res.json({
    success: true,
    data: {
      event,
      sentToClients: sentCount,
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * POST /api/websocket/notify
 * Belirli kullanıcıya bildirim gönder
 */
router.post('/notify', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const { userId, event, data } = req.body;

  if (!userId || !event) {
    return res.status(400).json({
      success: false,
      message: 'UserId and event are required'
    });
  }

  const message = {
    id: `notify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'notification',
    event,
    data: data || {},
    timestamp: Date.now(),
    userId
  };

  let sent = false;
  wss.clients.forEach(client => {
    if (client.readyState === 1 && (client as any).userId === userId) {
      client.send(JSON.stringify(message));
      sent = true;
    }
  });

  if (sent) {
    res.json({
      success: true,
      data: {
        userId,
        event,
        delivered: true,
        timestamp: new Date().toISOString()
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not connected',
      data: {
        userId,
        event,
        delivered: false,
        timestamp: new Date().toISOString()
      }
    });
  }
});

/**
 * POST /api/websocket/room/broadcast
 * Belirli odaya mesaj gönder
 */
router.post('/room/broadcast', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const { roomId, event, data, excludeUserId } = req.body;

  if (!roomId || !event) {
    return res.status(400).json({
      success: false,
      message: 'RoomId and event are required'
    });
  }

  const message = {
    id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'room_broadcast',
    event,
    data: data || {},
    timestamp: Date.now(),
    roomId
  };

  let sentCount = 0;
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      const clientUserId = (client as any).userId;
      const clientRooms = (client as any).rooms;
      
      // Check if client is in the room and not excluded
      if (clientRooms?.has(roomId) && (!excludeUserId || clientUserId !== excludeUserId)) {
        client.send(JSON.stringify(message));
        sentCount++;
      }
    }
  });

  res.json({
    success: true,
    data: {
      roomId,
      event,
      sentToClients: sentCount,
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * GET /api/websocket/clients
 * Bağlı kullanıcıları listele
 */
router.get('/clients', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const clients = Array.from(wss.clients).map(client => {
    const typedClient = client as any;
    return {
      userId: typedClient.userId || 'unknown',
      userRole: typedClient.userRole || 'unknown',
      readyState: client.readyState,
      rooms: typedClient.rooms ? Array.from(typedClient.rooms) : [],
      lastHeartbeat: typedClient.lastHeartbeat || null,
      connected: client.readyState === 1
    };
  });

  res.json({
    success: true,
    data: {
      clients,
      totalClients: clients.length,
      connectedClients: clients.filter(c => c.connected).length,
      timestamp: new Date().toISOString()
    }
  });
});

/**
 * DELETE /api/websocket/client/:userId
 * Belirli kullanıcının bağlantısını kes
 */
router.delete('/client/:userId', (req, res) => {
  if (!wss) {
    return res.status(503).json({
      success: false,
      message: 'WebSocket server not initialized'
    });
  }

  const { userId } = req.params;
  const { reason = 'Kicked by admin' } = req.body;

  let found = false;
  wss.clients.forEach(client => {
    if ((client as any).userId === userId) {
      client.close(1008, reason);
      found = true;
    }
  });

  if (found) {
    res.json({
      success: true,
      data: {
        userId,
        action: 'disconnected',
        reason,
        timestamp: new Date().toISOString()
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found',
      data: {
        userId,
        timestamp: new Date().toISOString()
      }
    });
  }
});

export default router;
