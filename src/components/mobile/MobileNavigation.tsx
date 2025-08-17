/**
 * Mobile Navigation Component
 * TypeScript best practices ile mobil navigasyon
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Shield, 
  Calendar, 
  MessageSquare, 
  CheckSquare,
  HelpingHand,
  Coins,
  GraduationCap
} from 'lucide-react';

interface MobileNavItem {
  readonly to: string;
  readonly icon: React.FC<{ className?: string }>;
  readonly label: string;
  readonly badge?: number;
}

interface MobileNavigationProps {
  readonly className?: string;
  readonly items?: readonly MobileNavItem[];
}

const defaultNavItems: readonly MobileNavItem[] = [
  {
    to: '/',
    icon: Home,
    label: 'Ana Sayfa'
  },
  {
    to: '/meetings',
    icon: Calendar,
    label: 'Toplantılar'
  },
  {
    to: '/tasks',
    icon: CheckSquare,
    label: 'Görevler'
  },
  {
    to: '/analytics',
    icon: TrendingUp,
    label: 'Analytics'
  },
  {
    to: '/security/settings',
    icon: Shield,
    label: 'Güvenlik'
  }
] as const;

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className = '',
  items = defaultNavItems
}) => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`mobile-nav ${className}`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`mobile-nav-item ${active ? 'active' : ''}`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

// Extended navigation with module-specific items
export const ExtendedMobileNavigation: React.FC<MobileNavigationProps> = ({
  className = ''
}) => {
  const extendedItems: readonly MobileNavItem[] = [
    {
      to: '/',
      icon: Home,
      label: 'Ana Sayfa'
    },
    {
      to: '/aid',
      icon: HelpingHand,
      label: 'Yardım'
    },
    {
      to: '/donations',
      icon: Coins,
      label: 'Bağışlar'
    },
    {
      to: '/scholarship',
      icon: GraduationCap,
      label: 'Burs'
    },
    {
      to: '/messages',
      icon: MessageSquare,
      label: 'Mesajlar'
    }
  ] as const;

  return (
    <MobileNavigation 
      className={className}
      items={extendedItems}
    />
  );
};
