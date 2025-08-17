/**
 * local server entry file, for local development with WebSocket support
 */
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import app from './app.js';
import { initializeWebSocket } from './websocket/websocketServer.js';

/**
 * start server with port
 */
const PORT = process.env.PORT || 3001;

// Create HTTP server
const server = createServer(app);

// Initialize WebSocket
const wss = new WebSocketServer({ 
  server,
  path: '/ws'
});

// Setup WebSocket handlers
initializeWebSocket(wss);

server.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}`);
  console.log(`📡 WebSocket server ready on ws://localhost:${PORT}/ws`);
});

/**
 * close server
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;