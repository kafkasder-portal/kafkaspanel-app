import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Video, Share2, Eye, Edit3, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { AvatarWithFallback } from '../AvatarWithFallback';

export interface CollaborationUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  activity: 'viewing' | 'editing' | 'idle';
  lastSeen?: Date;
  currentPage?: string;
}

export interface CollaborationSession {
  id: string;
  name: string;
  type: 'document' | 'meeting' | 'review';
  participants: CollaborationUser[];
  startTime: Date;
  isActive: boolean;
}

interface CollaborationPanelProps {
  className?: string;
  currentUser?: CollaborationUser;
}

const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
  className,
  currentUser 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeUsers, setActiveUsers] = useState<CollaborationUser[]>([]);
  const [sessions, setSessions] = useState<CollaborationSession[]>([]);

  useEffect(() => {
    // Mock collaboration data
    const mockUsers: CollaborationUser[] = [
      {
        id: '1',
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        status: 'online',
        activity: 'editing',
        currentPage: 'Proje Yönetimi'
      },
      {
        id: '2',
        name: 'Fatma Kaya',
        email: 'fatma@example.com',
        status: 'online',
        activity: 'viewing',
        currentPage: 'Dashboard'
      },
      {
        id: '3',
        name: 'Mehmet Demir',
        email: 'mehmet@example.com',
        status: 'away',
        activity: 'idle',
        lastSeen: new Date(Date.now() - 300000)
      }
    ];

    const mockSessions: CollaborationSession[] = [
      {
        id: '1',
        name: 'Proje Planlama Toplantısı',
        type: 'meeting',
        participants: mockUsers.slice(0, 2),
        startTime: new Date(Date.now() - 900000),
        isActive: true
      }
    ];

    setActiveUsers(mockUsers);
    setSessions(mockSessions);
  }, []);

  const getStatusColor = (status: CollaborationUser['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getActivityIcon = (activity: CollaborationUser['activity']) => {
    switch (activity) {
      case 'editing':
        return <Edit3 className="h-3 w-3 text-blue-500" />;
      case 'viewing':
        return <Eye className="h-3 w-3 text-green-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 60) return `${minutes} dakika`;
    return `${Math.floor(minutes / 60)} saat ${minutes % 60} dakika`;
  };

  const onlineUsers = activeUsers.filter(user => user.status === 'online');
  const totalActiveUsers = activeUsers.length;

  return (
    <div className={`${className}`}>
      <Card className="w-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">İşbirliği</h3>
              <Badge variant="secondary" className="ml-2">
                {onlineUsers.length} çevrimiçi
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Küçült' : 'Genişlet'}
            </Button>
          </div>

          {/* Active Users */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Aktif Kullanıcılar</h4>
            <ScrollArea className={isExpanded ? "h-32" : "h-20"}>
              <div className="space-y-2">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="relative">
                      <AvatarWithFallback
                        src={user.avatar}
                        alt={user.name}
                        fallback={user.name.split(' ').map(n => n[0]).join('')}
                        className="h-8 w-8"
                      />
                      <div 
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${
                          getStatusColor(user.status)
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        {getActivityIcon(user.activity)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.currentPage || 'Çevrimdışı'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      {user.status === 'online' && (
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Video className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {isExpanded && (
            <>
              <Separator className="my-4" />
              
              {/* Active Sessions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Aktif Oturumlar</h4>
                {sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aktif oturum yok</p>
                ) : (
                  <div className="space-y-2">
                    {sessions.map((session) => (
                      <Card key={session.id} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">{session.name}</h5>
                          <Badge 
                            variant={session.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {session.isActive ? 'Aktif' : 'Beklemede'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <Clock className="h-3 w-3" />
                          <span>Süre: {formatDuration(session.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-1">
                            {session.participants.slice(0, 3).map((participant) => (
                              <AvatarWithFallback
                                key={participant.id}
                                src={participant.avatar}
                                alt={participant.name}
                                fallback={participant.name.split(' ').map(n => n[0]).join('')}
                                className="h-6 w-6 border-2 border-background"
                              />
                            ))}
                            {session.participants.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs font-medium">
                                  +{session.participants.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Share2 className="h-3 w-3 mr-1" />
                            Katıl
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="my-4" />
              
              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Hızlı İşlemler</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Toplantı Başlat
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Ekran Paylaş
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CollaborationPanel;
export { CollaborationPanel };