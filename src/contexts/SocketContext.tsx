import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { websocketManager } from '@/lib/websocket/websocketManager'

/**
 * Enhanced WebSocket context with real WebSocket functionality
 */

interface SocketContextType {
  isConnected: boolean
  connectionError: string | null
  reconnectAttempts: number
  emit: (event: string, data?: any) => void
  on: (event: string, callback: (data: any) => void) => void
  off: (event: string, callback?: (data: any) => void) => void
  connect: (url?: string) => Promise<boolean>
  disconnect: () => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
  serverUrl?: string
  autoConnect?: boolean
}

export function SocketProvider({ 
  children, 
  serverUrl = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3001',
  autoConnect = false // Disable auto-connect for now since we don't have a server
}: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  // Update state based on WebSocket manager
  useEffect(() => {
    const updateStatus = () => {
      const status = websocketManager.getConnectionStatus()
      setIsConnected(status.isConnected)
      setConnectionError(status.connectionError || null)
      setReconnectAttempts(status.reconnectAttempts)
    }

    // Initial status
    updateStatus()

    // Listen for connection events
    websocketManager.on('connect', updateStatus)
    websocketManager.on('disconnect', updateStatus)
    websocketManager.on('error', updateStatus)

    return () => {
      websocketManager.off('connect', updateStatus)
      websocketManager.off('disconnect', updateStatus)
      websocketManager.off('error', updateStatus)
    }
  }, [])

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect && !isConnected) {
      websocketManager.connect(serverUrl).catch(error => {
        console.error('Auto-connect failed:', error)
      })
    }
  }, [autoConnect, serverUrl, isConnected])

  const emit = (event: string, data?: any) => {
    websocketManager.send(event, data)
  }

  const on = (event: string, callback: (data: any) => void) => {
    websocketManager.on(event, callback)
  }

  const off = (event: string, callback?: (data: any) => void) => {
    websocketManager.off(event, callback)
  }

  const connect = async (url?: string): Promise<boolean> => {
    return await websocketManager.connect(url || serverUrl)
  }

  const disconnect = () => {
    websocketManager.disconnect()
  }

  const value: SocketContextType = {
    isConnected,
    connectionError,
    reconnectAttempts,
    emit,
    on,
    off,
    connect,
    disconnect
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

/**
 * Socket bağlantı durumunu gösteren hook
 */
export function useSocketStatus() {
  const { isConnected, connectionError, reconnectAttempts } = useSocket()
  
  return {
    isConnected,
    connectionError,
    reconnectAttempts,
    status: isConnected ? 'connected' : connectionError ? 'error' : 'connecting'
  }
}