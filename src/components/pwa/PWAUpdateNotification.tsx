/**
 * PWA Update Notification Component
 * TypeScript best practices ile PWA güncelleme bildirimi
 */

import React, { useState, useCallback } from 'react';
import { RefreshCw, X, Download } from 'lucide-react';
import { useAppUpdates } from '@/hooks/usePWA';

interface PWAUpdateNotificationProps {
  readonly className?: string;
  readonly variant?: 'banner' | 'toast' | 'modal';
  readonly position?: 'top' | 'bottom' | 'top-right';
  readonly autoShow?: boolean;
}

export const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({
  className = '',
  variant = 'toast',
  position = 'top-right',
  autoShow = true
}) => {
  const { hasUpdate, updateApp } = useAppUpdates();
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = useCallback(async () => {
    setIsUpdating(true);
    try {
      const success = await updateApp();
      if (success) {
        // App will reload automatically
        console.log('🔄 Uygulama güncelleniyor...');
      }
    } catch (error) {
      console.error('Update failed:', error);
      setIsUpdating(false);
    }
  }, [updateApp]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Don't show if no update available or user dismissed
  if (!hasUpdate || !isVisible || !autoShow) {
    return null;
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Güncelleme Mevcut</h3>
              <p className="text-sm text-gray-600">Yeni özellikler ve düzeltmeler</p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            Dernek Yönetim Paneli'nin yeni bir sürümü mevcut. 
            Güncellemek için aşağıdaki butona tıklayın. Uygulama otomatik olarak yeniden başlayacak.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Şimdi Güncelle
                </>
              )}
            </button>
            <button
              onClick={handleDismiss}
              disabled={isUpdating}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Daha Sonra
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`
        fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-40 
        bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-lg
        ${className}
      `}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5" />
            <div>
              <h4 className="font-medium">Güncelleme Mevcut</h4>
              <p className="text-sm text-green-100">
                Yeni özellikler ve hata düzeltmeleri içeren bir güncelleme mevcut
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-white text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Güncelle
                </>
              )}
            </button>
            <button
              onClick={handleDismiss}
              disabled={isUpdating}
              className="p-2 hover:bg-green-400 rounded disabled:opacity-50"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default toast variant
  const positionClasses = {
    'top': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 max-w-sm min-w-80">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <RefreshCw className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm mb-1">Güncelleme Mevcut</h4>
              <p className="text-xs text-gray-600 mb-3">
                Yeni özellikler ve düzeltmeler içeren bir sürüm mevcut
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="bg-green-500 text-white text-xs py-1.5 px-3 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3" />
                      Güncelle
                    </>
                  )}
                </button>
                <button
                  onClick={handleDismiss}
                  disabled={isUpdating}
                  className="text-gray-500 text-xs py-1.5 px-2 hover:text-gray-700 disabled:opacity-50"
                >
                  Sonra
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            disabled={isUpdating}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
