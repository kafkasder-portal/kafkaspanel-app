/**
 * PWA Install Banner Component
 * TypeScript best practices ile PWA kurulum banner'ı
 */

import React, { useState, useCallback } from 'react';
import { Download, X, Smartphone, Monitor, Share } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/usePWA';

interface PWAInstallBannerProps {
  readonly className?: string;
  readonly variant?: 'banner' | 'modal' | 'floating';
  readonly position?: 'top' | 'bottom';
  readonly showIcon?: boolean;
  readonly autoHide?: boolean;
  readonly autoHideDelay?: number;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  className = '',
  variant = 'banner',
  position = 'bottom',
  showIcon = true,
  autoHide = false,
  autoHideDelay = 10000
}) => {
  const { isInstallable, isInstalled, installApp } = useInstallPrompt();
  const [isVisible, setIsVisible] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);

  // Auto hide after delay
  React.useEffect(() => {
    if (autoHide && isVisible && isInstallable) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, isVisible, isInstallable]);

  const handleInstall = useCallback(async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Install failed:', error);
    } finally {
      setIsInstalling(false);
    }
  }, [installApp]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    // Store dismissal in localStorage to remember user preference
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
  }, []);

  // Don't show if not installable, already installed, or user dismissed
  if (!isInstallable || isInstalled || !isVisible) {
    return null;
  }

  // Check if user previously dismissed (within last 7 days)
  const dismissedTime = localStorage.getItem('pwa_install_dismissed');
  if (dismissedTime) {
    const dismissedDate = new Date(parseInt(dismissedTime));
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (dismissedDate > weekAgo) {
      return null;
    }
  }

  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {showIcon && <Smartphone className="w-6 h-6 text-blue-500" />}
              <h3 className="text-lg font-semibold">Uygulamayı Yükle</h3>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Dernek Yönetim Paneli'ni cihazınıza yükleyerek daha hızlı erişim sağlayın. 
            Offline çalışma, bildirimler ve daha iyi performans özelliklerinden yararlanın.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isInstalling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Yükle
                </>
              )}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Daha Sonra
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} right-4 z-40 ${className}`}>
        <div className="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {showIcon && <Monitor className="w-5 h-5 text-blue-500" />}
                <h4 className="font-medium text-sm">App Yükle</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Daha iyi deneyim için uygulamayı yükleyin
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="bg-blue-500 text-white text-xs py-1 px-3 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isInstalling ? 'Yükleniyor...' : 'Yükle'}
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-gray-500 text-xs py-1 px-2 hover:text-gray-700"
                >
                  Kapat
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default banner variant
  return (
    <div className={`
      fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-40 
      bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-lg
      ${className}
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {showIcon && <Share className="w-5 h-5" />}
          <div>
            <h4 className="font-medium">Dernek Paneli'ni Yükle</h4>
            <p className="text-sm text-blue-100">
              Offline erişim, hızlı performans ve bildirimler için uygulamayı cihazınıza yükleyin
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {isInstalling ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Yükle
              </>
            )}
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-blue-400 rounded"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
