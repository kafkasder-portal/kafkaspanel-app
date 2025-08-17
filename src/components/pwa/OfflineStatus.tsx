/**
 * Offline Status Component
 * TypeScript best practices ile offline durum göstergesi
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CloudOff, RotateCcw, AlertCircle } from 'lucide-react';
import { usePWA, useOfflineQueue } from '@/hooks/usePWA';

interface OfflineStatusProps {
  readonly className?: string;
  readonly variant?: 'badge' | 'banner' | 'icon';
  readonly showQueueInfo?: boolean;
  readonly position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const OfflineStatus: React.FC<OfflineStatusProps> = ({
  className = '',
  variant = 'badge',
  showQueueInfo = true,
  position = 'top-right'
}) => {
  const { isOnline, isOfflineCapable, processOfflineQueue } = usePWA();
  const { queueStats } = useOfflineQueue();
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Show details temporarily when status changes
  useEffect(() => {
    if (variant === 'icon') {
      setShowDetails(true);
      const timer = setTimeout(() => setShowDetails(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, variant]);

  const handleSync = async () => {
    if (!isOnline) return;
    
    setIsProcessing(true);
    try {
      await processOfflineQueue();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return 'text-red-500';
    if (queueStats && queueStats.pendingActions > 0) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusBgColor = () => {
    if (!isOnline) return 'bg-red-50 border-red-200';
    if (queueStats && queueStats.pendingActions > 0) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (queueStats && queueStats.pendingActions > 0) return `${queueStats.pendingActions} Bekliyor`;
    return 'Online';
  };

  const getStatusIcon = () => {
    if (!isOnline) return isOfflineCapable ? <WifiOff className="w-4 h-4" /> : <CloudOff className="w-4 h-4" />;
    if (queueStats && queueStats.pendingActions > 0) return <RotateCcw className="w-4 h-4" />;
    return <Wifi className="w-4 h-4" />;
  };

  if (variant === 'icon') {
    const positionClasses = {
      'top-left': 'top-4 left-4',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-right': 'bottom-4 right-4'
    };

    return (
      <div className={`fixed ${positionClasses[position]} z-30 ${className}`}>
        <div 
          className={`
            relative cursor-pointer transition-all duration-200
            ${showDetails ? 'transform scale-110' : ''}
          `}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${getStatusBgColor()} border backdrop-blur-sm
            ${getStatusColor()}
          `}>
            {getStatusIcon()}
          </div>
          
          {showDetails && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border p-3 min-w-48 z-10">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon()}
                <span className={`font-medium text-sm ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
              </div>
              
              {showQueueInfo && queueStats && (
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Toplam İşlem: {queueStats.totalActions}</div>
                  <div>Bekleyen: {queueStats.pendingActions}</div>
                  <div>Başarısız: {queueStats.failedActions}</div>
                  {isOnline && queueStats.pendingActions > 0 && (
                    <button
                      onClick={handleSync}
                      disabled={isProcessing}
                      className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded text-xs hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isProcessing ? 'Senkronize ediliyor...' : 'Şimdi Senkronize Et'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    // Only show banner when offline or when there are pending actions
    if (isOnline && (!queueStats || queueStats.pendingActions === 0)) {
      return null;
    }

    return (
      <div className={`
        w-full p-3 border-b
        ${getStatusBgColor()}
        ${className}
      `}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={getStatusColor()}>
              {getStatusIcon()}
            </div>
            <div>
              <div className={`font-medium text-sm ${getStatusColor()}`}>
                {!isOnline ? 'Offline Modda Çalışıyorsunuz' : `${queueStats?.pendingActions} İşlem Senkronizasyon Bekliyor`}
              </div>
              <div className="text-xs text-gray-600">
                {!isOnline 
                  ? 'İşlemleriniz kuyruğa alınıyor. İnternet bağlantısı geldiğinde otomatik senkronize edilecek.'
                  : 'İnternet bağlantınız mevcut. İşlemleri senkronize edebilirsiniz.'
                }
              </div>
            </div>
          </div>
          
          {isOnline && queueStats && queueStats.pendingActions > 0 && (
            <button
              onClick={handleSync}
              disabled={isProcessing}
              className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center gap-1"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  Senkronize ediliyor...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  Senkronize Et
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default badge variant
  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border
      ${getStatusBgColor()} ${getStatusColor()}
      ${className}
    `}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      
      {showQueueInfo && queueStats && queueStats.pendingActions > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-xs">•</span>
          <span className="text-xs">{queueStats.pendingActions} bekliyor</span>
          {isOnline && (
            <button
              onClick={handleSync}
              disabled={isProcessing}
              className="ml-1 p-1 hover:bg-white hover:bg-opacity-50 rounded"
              title="Şimdi senkronize et"
            >
              <RotateCcw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      )}
      
      {!isOfflineCapable && !isOnline && (
        <AlertCircle className="w-4 h-4 text-orange-500" />
      )}
    </div>
  );
};
