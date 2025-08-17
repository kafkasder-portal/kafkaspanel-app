/**
 * Real-time Notification Center Component
 * TypeScript best practices ile gerçek zamanlı bildirim merkezi
 */

import React, { useState, useCallback } from 'react';
import { Bell, X, Filter } from 'lucide-react';
import { useRealtimeNotifications } from '@/hooks/useWebSocket';
import { useAuthStore } from '@/store/auth';
import type { RealtimeNotification } from '@/lib/websocket/realtimeNotificationManager';

interface RealtimeNotificationCenterProps {
  readonly className?: string;
  readonly position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  readonly maxNotifications?: number;
  readonly autoHideDelay?: number;
}

export const RealtimeNotificationCenter: React.FC<RealtimeNotificationCenterProps> = ({
  className = '',
  position = 'top-right',
  maxNotifications = 5
}) => {
  const { user } = useAuthStore();
  const { 
    notifications, 
    isInitialized,
    dismissNotification,
    clearAllNotifications
  } = useRealtimeNotifications(user?.id);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('unread');

  // Filter notifications
  const filteredNotifications = notifications
    .slice(0, maxNotifications)
    .filter(notification => {
      if (filter === 'unread') {
        return !notification.persistent; // Assuming non-persistent are "new"
      }
      return true;
    });

  const unreadCount = notifications.filter(n => !n.persistent).length;

  const handleDismiss = useCallback((notificationId: string) => {
    dismissNotification(notificationId);
  }, [dismissNotification]);

  const handleClearAll = useCallback(() => {
    clearAllNotifications();
    setIsOpen(false);
  }, [clearAllNotifications]);

  const getNotificationIcon = (type: RealtimeNotification['type']): string => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      urgent: '🚨'
    };
    return icons[type] || icons.info;
  };

  const getNotificationColor = (type: RealtimeNotification['type']): string => {
    const colors = {
      info: 'border-blue-200 bg-blue-50',
      success: 'border-green-200 bg-green-50',
      warning: 'border-yellow-200 bg-yellow-50',
      error: 'border-red-200 bg-red-50',
      urgent: 'border-red-300 bg-red-100'
    };
    return colors[type] || colors.info;
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {isOpen && (
          <div className="absolute top-12 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Bildirimler</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
                    className="p-1 hover:bg-gray-100 rounded"
                    title={filter === 'all' ? 'Sadece okunmamış' : 'Tümünü göster'}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {notifications.length > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {filteredNotifications.length} bildirim
                  </span>
                  <button
                    onClick={handleClearAll}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Tümünü Temizle
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>Bildirim bulunamadı</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${getNotificationColor(notification.type)}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </span>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {notification.timestamp.toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            
                            <div className="flex items-center gap-1">
                              {notification.actionUrl && (
                                <button
                                  onClick={() => {
                                    window.location.href = notification.actionUrl!;
                                    handleDismiss(notification.id);
                                  }}
                                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                >
                                  Görüntüle
                                </button>
                              )}
                              
                              <button
                                onClick={() => handleDismiss(notification.id)}
                                className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                                title="Kapat"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > maxNotifications && (
              <div className="p-3 border-t border-gray-100 text-center">
                <button className="text-sm text-blue-500 hover:text-blue-600">
                  {notifications.length - maxNotifications} daha fazla bildirim
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications - Show outside panel */}
      {!isOpen && filteredNotifications.slice(0, 3).map((notification, index) => (
        <div
          key={notification.id}
          className={`
            fixed ${positionClasses[position]} z-40 mb-16
            transform transition-all duration-300 ease-in-out
          `}
          style={{
            transform: `translateY(${index * 80}px)`,
            opacity: 1 - (index * 0.2)
          }}
        >
          <div className={`
            max-w-sm bg-white rounded-lg shadow-lg border p-4 
            ${getNotificationColor(notification.type)}
          `}>
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </span>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">
                    Az önce
                  </span>
                  
                  <button
                    onClick={() => handleDismiss(notification.id)}
                    className="p-1 hover:bg-white hover:bg-opacity-50 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
