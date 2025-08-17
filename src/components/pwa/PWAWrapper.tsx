/**
 * PWA Wrapper Component
 * Ana PWA özelliklerini yöneten wrapper component
 */

import React from 'react';
import { PWAInstallBanner } from './PWAInstallBanner';
import { PWAUpdateNotification } from './PWAUpdateNotification';
import { OfflineStatus } from './OfflineStatus';

interface PWAWrapperProps {
  readonly children: React.ReactNode;
  readonly showInstallBanner?: boolean;
  readonly showUpdateNotification?: boolean;
  readonly showOfflineStatus?: boolean;
  readonly installBannerVariant?: 'banner' | 'modal' | 'floating';
  readonly updateNotificationVariant?: 'banner' | 'toast' | 'modal';
  readonly offlineStatusVariant?: 'badge' | 'banner' | 'icon';
  readonly className?: string;
}

export const PWAWrapper: React.FC<PWAWrapperProps> = ({
  children,
  showInstallBanner = true,
  showUpdateNotification = true,
  showOfflineStatus = true,
  installBannerVariant = 'floating',
  updateNotificationVariant = 'toast',
  offlineStatusVariant = 'icon',
  className = ''
}) => {
  return (
    <div className={className}>
      {children}
      
      {/* PWA Install Banner */}
      {showInstallBanner && (
        <PWAInstallBanner 
          variant={installBannerVariant}
          position="bottom"
          autoHide={true}
          autoHideDelay={15000}
        />
      )}
      
      {/* PWA Update Notification */}
      {showUpdateNotification && (
        <PWAUpdateNotification 
          variant={updateNotificationVariant}
          position="top-right"
          autoShow={true}
        />
      )}
      
      {/* Offline Status */}
      {showOfflineStatus && (
        <OfflineStatus 
          variant={offlineStatusVariant}
          position="top-right"
          showQueueInfo={true}
        />
      )}
    </div>
  );
};
