import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error' | 'reconnecting';

export interface WebSocketConfig {
  url?: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
}

export interface ConnectionMetrics {
  latency: number;
  uptime: number;
  reconnectCount: number;
  lastConnected?: Date;
  lastDisconnected?: Date;
}

interface WebSocketStatusProps {
  className?: string;
  config?: WebSocketConfig;
  showDetails?: boolean;
  onStatusChange?: (status: ConnectionStatus) => void;
}

const WebSocketStatus: React.FC<WebSocketStatusProps> = ({ 
  className,
  config = {},
  showDetails = false,
  onStatusChange 
}) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [metrics, setMetrics] = useState<ConnectionMetrics>({
    latency: 0,
    uptime: 0,
    reconnectCount: 0
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastPing, setLastPing] = useState<Date | null>(null);

  // Mock WebSocket connection simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let reconnectTimeout: NodeJS.Timeout;
    
    const simulateConnection = () => {
      setStatus('connecting');
      
      // Simulate connection delay
      setTimeout(() => {
        const isSuccessful = Math.random() > 0.1; // 90% success rate
        
        if (isSuccessful) {
          setStatus('connected');
          setMetrics(prev => ({
            ...prev,
            lastConnected: new Date(),
            latency: Math.floor(Math.random() * 50) + 10 // 10-60ms
          }));
          
          // Start heartbeat
          interval = setInterval(() => {
            setLastPing(new Date());
            setMetrics(prev => ({
              ...prev,
              uptime: prev.uptime + 1,
              latency: Math.floor(Math.random() * 50) + 10
            }));
          }, config.heartbeatInterval || 5000);
        } else {
          setStatus('error');
          setMetrics(prev => ({
            ...prev,
            lastDisconnected: new Date()
          }));
          
          // Auto reconnect
          reconnectTimeout = setTimeout(() => {
            setStatus('reconnecting');
            setMetrics(prev => ({
              ...prev,
              reconnectCount: prev.reconnectCount + 1
            }));
            simulateConnection();
          }, config.reconnectInterval || 3000);
        }
      }, 1000);
    };

    simulateConnection();

    return () => {
      if (interval) clearInterval(interval);
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [config.heartbeatInterval, config.reconnectInterval]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const getStatusConfig = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          color: 'text-green-500',
          bgColor: 'bg-green-500',
          label: 'Bağlı',
          variant: 'default' as const
        };
      case 'connecting':
        return {
          icon: <RefreshCw className="h-4 w-4 animate-spin" />,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500',
          label: 'Bağlanıyor',
          variant: 'secondary' as const
        };
      case 'reconnecting':
        return {
          icon: <RefreshCw className="h-4 w-4 animate-spin" />,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500',
          label: 'Yeniden Bağlanıyor',
          variant: 'secondary' as const
        };
      case 'error':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          color: 'text-red-500',
          bgColor: 'bg-red-500',
          label: 'Hata',
          variant: 'destructive' as const
        };
      default:
        return {
          icon: <WifiOff className="h-4 w-4" />,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500',
          label: 'Bağlantısız',
          variant: 'secondary' as const
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) return `${hours}s ${minutes}d ${secs}s`;
    if (minutes > 0) return `${minutes}d ${secs}s`;
    return `${secs}s`;
  };

  const handleReconnect = () => {
    setStatus('connecting');
    // Trigger reconnection logic here
  };

  return (
    <TooltipProvider>
      <div className={`${className}`}>
        {showDetails ? (
          <Card className="w-full">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={statusConfig.color}>
                    {statusConfig.icon}
                  </div>
                  <h3 className="font-semibold">WebSocket Durumu</h3>
                  <Badge variant={statusConfig.variant}>
                    {statusConfig.label}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Küçült' : 'Detaylar'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Gecikme</p>
                  <p className="text-sm font-medium">{metrics.latency}ms</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Çalışma Süresi</p>
                  <p className="text-sm font-medium">{formatUptime(metrics.uptime)}</p>
                </div>
              </div>

              {isExpanded && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Yeniden Bağlanma</p>
                      <p className="text-sm font-medium">{metrics.reconnectCount} kez</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Son Ping</p>
                      <p className="text-sm font-medium">
                        {lastPing ? lastPing.toLocaleTimeString('tr-TR') : 'Yok'}
                      </p>
                    </div>
                  </div>

                  {metrics.lastConnected && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Son Bağlantı</p>
                      <p className="text-sm font-medium">
                        {metrics.lastConnected.toLocaleString('tr-TR')}
                      </p>
                    </div>
                  )}

                  {metrics.lastDisconnected && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Son Kopma</p>
                      <p className="text-sm font-medium">
                        {metrics.lastDisconnected.toLocaleString('tr-TR')}
                      </p>
                    </div>
                  )}

                  {(status === 'error' || status === 'disconnected') && (
                    <Button 
                      onClick={handleReconnect}
                      className="w-full"
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Yeniden Bağlan
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className={`relative ${statusConfig.color}`}>
                  {statusConfig.icon}
                  <div 
                    className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                      statusConfig.bgColor
                    } ${status === 'connected' ? 'animate-pulse' : ''}`}
                  />
                </div>
                {showDetails && (
                  <span className="text-xs text-muted-foreground">
                    {metrics.latency}ms
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-medium">{statusConfig.label}</p>
                <p className="text-xs">Gecikme: {metrics.latency}ms</p>
                <p className="text-xs">Çalışma: {formatUptime(metrics.uptime)}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default WebSocketStatus;
export { WebSocketStatus };