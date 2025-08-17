/**
 * Collaboration Panel Component
 * TypeScript best practices ile gerçek zamanlı işbirliği paneli
 */

import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Activity, Minus } from 'lucide-react';
import { useCollaboration, useTypingIndicator } from '@/hooks/useWebSocket';
import { useAuthStore } from '@/store/auth';
import type { CollaborationUser } from '@/lib/websocket/collaborationManager';

interface CollaborationPanelProps {
  readonly className?: string;
  readonly roomId?: string;
  readonly roomName?: string;
  readonly position?: 'right' | 'left' | 'bottom';
  readonly minimizable?: boolean;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  className = '',
  roomId,
  roomName,
  position = 'right',
  minimizable = true
}) => {
  const { user } = useAuthStore();
  const {
    activeUsers,
    currentRoom,
    isInitialized,
    joinRoom,
    leaveRoom,
    updateUserStatus,
    logActivity
  } = useCollaboration(user ? {
    id: user.id,
    name: (user as any).name || user.email,
    role: user.role || 'user'
  } : undefined);

  const { typingUsers, isAnyoneTyping } = useTypingIndicator(roomId);
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<CollaborationUser['status']>('online');

  // Auto-join room if provided
  useEffect(() => {
    if (roomId && isInitialized && roomId !== currentRoom) {
      joinRoom(roomId, roomName);
    }
  }, [roomId, roomName, isInitialized, currentRoom, joinRoom]);

  // Log activity when component mounts/unmounts
  useEffect(() => {
    if (isInitialized && roomId) {
      logActivity({
        action: 'viewing',
        resource: {
          type: 'room',
          id: roomId,
          name: roomName || roomId
        }
      });
    }
  }, [isInitialized, roomId, roomName, logActivity]);

  const handleStatusChange = (status: CollaborationUser['status']) => {
    setSelectedStatus(status);
    updateUserStatus(status);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
  };

  const getStatusColor = (status: CollaborationUser['status']): string => {
    const colors = {
      online: 'bg-green-400',
      away: 'bg-yellow-400',
      busy: 'bg-red-400',
      offline: 'bg-gray-400'
    };
    return colors[status];
  };

  const getStatusLabel = (status: CollaborationUser['status']): string => {
    const labels = {
      online: 'Çevrimiçi',
      away: 'Uzakta',
      busy: 'Meşgul',
      offline: 'Çevrimdışı'
    };
    return labels[status];
  };

  const formatLastSeen = (lastSeen: Date): string => {
    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Şimdi';
    if (minutes < 60) return `${minutes} dk önce`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} sa önce`;
    
    const days = Math.floor(hours / 24);
    return `${days} gün önce`;
  };

  const positionClasses = {
    right: 'right-4 top-1/2 transform -translate-y-1/2',
    left: 'left-4 top-1/2 transform -translate-y-1/2',
    bottom: 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      <div className={`
        bg-white rounded-lg shadow-lg border border-gray-200 
        transition-all duration-300 ease-in-out
        ${isMinimized ? 'w-16 h-16' : 'w-80 max-h-96'}
      `}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!isMinimized && (
            <>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">
                  {currentRoom ? 'İşbirliği' : 'Çevrimdışı'}
                </h3>
                {activeUsers.length > 0 && (
                  <span className="text-sm text-gray-500">
                    ({activeUsers.length} kullanıcı)
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                {currentRoom && (
                  <button
                    onClick={handleLeaveRoom}
                    className="p-1 hover:bg-gray-100 rounded text-red-500"
                    title="Odadan ayrıl"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
                
                {minimizable && (
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
          
          {isMinimized && (
            <button
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center"
            >
              <Users className="w-5 h-5 text-blue-500" />
              {activeUsers.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  {activeUsers.length}
                </span>
              )}
            </button>
          )}
        </div>

        {!isMinimized && (
          <>
            {/* Status Selector */}
            {currentRoom && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Durumunuz:</span>
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value as CollaborationUser['status'])}
                  className="w-full text-sm border border-gray-200 rounded px-2 py-1"
                >
                  <option value="online">🟢 Çevrimiçi</option>
                  <option value="away">🟡 Uzakta</option>
                  <option value="busy">🔴 Meşgul</option>
                </select>
              </div>
            )}

            {/* Active Users */}
            <div className="p-3 max-h-48 overflow-y-auto">
              {activeUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Aktif kullanıcı yok</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Aktif Kullanıcılar ({activeUsers.length})
                  </h4>
                  
                  {activeUsers.map((collaborationUser) => (
                    <div
                      key={collaborationUser.id}
                      className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {collaborationUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(collaborationUser.status)}`} />
                      </div>
                      
                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {collaborationUser.name}
                          </span>
                          {collaborationUser.id === user?.id && (
                            <span className="text-xs text-blue-500">(Sen)</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>{getStatusLabel(collaborationUser.status)}</span>
                          {collaborationUser.status !== 'online' && (
                            <span>• {formatLastSeen(collaborationUser.lastSeen)}</span>
                          )}
                        </div>
                        
                        {collaborationUser.currentAction && (
                          <div className="flex items-center gap-1 text-xs text-blue-600">
                            <Activity className="w-3 h-3" />
                            <span>{collaborationUser.currentAction}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Typing Indicators */}
            {isAnyoneTyping && (
              <div className="p-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span>
                    {typingUsers.length === 1 
                      ? `${typingUsers[0].userName} yazıyor...`
                      : `${typingUsers.length} kişi yazıyor...`
                    }
                  </span>
                </div>
              </div>
            )}

            {/* Room Info */}
            {currentRoom && (
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <div className="text-xs text-gray-600">
                  <div className="flex items-center gap-1 mb-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>Oda: {roomName || currentRoom}</span>
                  </div>
                  <div className="text-gray-500">
                    Gerçek zamanlı işbirliği aktif
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
