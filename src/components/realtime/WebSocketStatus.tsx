/**
 * WebSocket Status Component
 * TypeScript best practices ile WebSocket bağlantı durumu göstergesi
 */

import React, { useState } from 'react';
import { Wifi, WifiOff, RotateCcw, Activity } from 'lucide-react';
import { useWebSocket } from '@/hooks/useWebSocket';

interface WebSocketStatusProps {
  readonly className?: string;
  readonly variant?: 'badge' | 'detailed' | 'minimal';
  readonly showLatency?: boolean;
  readonly showReconnectButton?: boolean;
  readonly autoConnect?: boolean;
}

export const WebSocketStatus: React.FC<WebSocketStatusProps> = ({
  className = '',
  variant = 'badge',
  showLatency = true,
  showReconnectButton = true,
  autoConnect = true
}) => {
  const {
    isConnected,
    isConnecting,
    connectionError,
    reconnectAttempts,
    latency,
    connect,
    disconnect,
    measureLatency
  } = useWebSocket();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMeasuringLatency, setIsMeasuringLatency] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleMeasureLatency = async () => {
    setIsMeasuringLatency(true);
    try {
      await measureLatency();
    } catch (error) {
      console.error('Failed to measure latency:', error);
    } finally {
      setIsMeasuringLatency(false);
    }
  };

  const getStatusColor = (): string => {
    if (isConnected) return 'text-green-500';
    if (isConnecting) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBgColor = (): string => {
    if (isConnected) return 'bg-green-50 border-green-200';
    if (isConnecting) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getStatusText = (): string => {
    if (isConnected) return 'Bağlı';
    if (isConnecting) return 'Bağlanıyor...';
    if (connectionError) return 'Hata';
    return 'Bağlantısız';
  };

  const getStatusIcon = () => {
    if (isConnected) return <Wifi className="w-4 h-4" />;
    if (isConnecting) return <RotateCcw className="w-4 h-4 animate-spin" />;
    return <WifiOff className="w-4 h-4" />;
  };

  const getLatencyColor = (ms?: number): string => {
    if (!ms) return 'text-gray-500';
    if (ms < 50) return 'text-green-500';
    if (ms < 150) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLatencyLabel = (ms?: number): string => {
    if (!ms) return 'Bilinmiyor';
    if (ms < 50) return 'Mükemmel';
    if (ms < 150) return 'İyi';
    if (ms < 300) return 'Orta';
    return 'Yavaş';
  };

  // Auto-connect on mount
  React.useEffect(() => {
    if (autoConnect && !isConnected && !isConnecting) {
      connect().catch(console.error);
    }
  }, [autoConnect, isConnected, isConnecting, connect]);

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className={getStatusColor()}>
          {getStatusIcon()}
        </div>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div 
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border cursor-pointer
          ${getStatusBgColor()} ${getStatusColor()} ${className}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {getStatusIcon()}
        <span>{getStatusText()}</span>
        
        {showLatency && latency && isConnected && (
          <>
            <span className="text-xs">•</span>
            <span className={`text-xs ${getLatencyColor(latency)}`}>
              {latency}ms
            </span>
          </>
        )}
        
        {reconnectAttempts > 0 && (
          <>
            <span className="text-xs">•</span>
            <span className="text-xs text-orange-500">
              {reconnectAttempts} deneme
            </span>
          </>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">WebSocket Durumu</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Bağlantı:</span>
                  <span className={getStatusColor()}>{getStatusText()}</span>
                </div>
                
                {latency && (
                  <div className="flex justify-between">
                    <span>Gecikme:</span>
                    <span className={getLatencyColor(latency)}>
                      {latency}ms ({getLatencyLabel(latency)})
                    </span>
                  </div>
                )}
                
                {reconnectAttempts > 0 && (
                  <div className="flex justify-between">
                    <span>Yeniden bağlanma:</span>
                    <span className="text-orange-500">{reconnectAttempts} deneme</span>
                  </div>
                )}
                
                {connectionError && (
                  <div className="text-red-500 text-xs">
                    Hata: {connectionError}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2 border-t">
                {showLatency && isConnected && (
                  <button
                    onClick={handleMeasureLatency}
                    disabled={isMeasuringLatency}
                    className="flex-1 text-xs bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isMeasuringLatency ? 'Ölçülüyor...' : 'Gecikme Ölç'}
                  </button>
                )}
                
                {showReconnectButton && (
                  <button
                    onClick={isConnected ? handleDisconnect : handleConnect}
                    disabled={isConnecting}
                    className="flex-1 text-xs bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600 disabled:opacity-50"
                  >
                    {isConnected ? 'Bağlantıyı Kes' : 'Yeniden Bağlan'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detailed variant
  return (
    <div className={`bg-white rounded-lg shadow border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          WebSocket Bağlantısı
        </h3>
        
        <div className={`flex items-center gap-2 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Connection Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Durum:</span>
            <div className={`font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
          </div>
          
          {latency && (
            <div>
              <span className="text-gray-500">Gecikme:</span>
              <div className={`font-medium ${getLatencyColor(latency)}`}>
                {latency}ms
              </div>
            </div>
          )}
          
          {reconnectAttempts > 0 && (
            <div>
              <span className="text-gray-500">Deneme:</span>
              <div className="font-medium text-orange-500">
                {reconnectAttempts}
              </div>
            </div>
          )}
          
          <div>
            <span className="text-gray-500">Kalite:</span>
            <div className={`font-medium ${getLatencyColor(latency)}`}>
              {getLatencyLabel(latency)}
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {connectionError && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            <strong>Hata:</strong> {connectionError}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t">
          {showLatency && isConnected && (
            <button
              onClick={handleMeasureLatency}
              disabled={isMeasuringLatency}
              className="flex items-center gap-1 text-sm bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              <Activity className="w-3 h-3" />
              {isMeasuringLatency ? 'Ölçülüyor...' : 'Gecikme Ölç'}
            </button>
          )}
          
          {showReconnectButton && (
            <button
              onClick={isConnected ? handleDisconnect : handleConnect}
              disabled={isConnecting}
              className="flex items-center gap-1 text-sm bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              <RotateCcw className="w-3 h-3" />
              {isConnected ? 'Bağlantıyı Kes' : 'Yeniden Bağlan'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
