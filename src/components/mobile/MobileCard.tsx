/**
 * Mobile Card Component
 * TypeScript best practices ile mobil kart komponenti
 */

import React from 'react';
import { ChevronRight, MoreVertical } from 'lucide-react';

interface MobileCardProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly badgeColor?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  readonly onClick?: () => void;
  readonly onMenuClick?: () => void;
  readonly showChevron?: boolean;
  readonly showMenu?: boolean;
  readonly children?: React.ReactNode;
  readonly className?: string;
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly variant?: 'default' | 'elevated' | 'outlined';
}

export const MobileCard: React.FC<MobileCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  badge,
  badgeColor = 'blue',
  onClick,
  onMenuClick,
  showChevron = true,
  showMenu = false,
  children,
  className = '',
  header,
  footer,
  variant = 'default'
}) => {
  const getBadgeClasses = (color: typeof badgeColor): string => {
    const baseClasses = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
    
    switch (color) {
      case 'blue':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'green':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'yellow':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'red':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'gray':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  const getCardClasses = (): string => {
    const baseClasses = 'mobile-card touch-feedback';
    
    switch (variant) {
      case 'elevated':
        return `${baseClasses} shadow-lg`;
      case 'outlined':
        return `${baseClasses} border border-gray-200 shadow-none`;
      default:
        return baseClasses;
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <div
      className={`${getCardClasses()} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
    >
      {/* Header */}
      {header && (
        <div className="mb-4">
          {header}
        </div>
      )}

      {/* Main Content */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Badge */}
          {title && (
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
              {badge && (
                <span className={getBadgeClasses(badgeColor)}>
                  {badge}
                </span>
              )}
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          )}

          {/* Children */}
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Menu Button */}
          {showMenu && (
            <button
              onClick={handleMenuClick}
              className="touch-target text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          )}

          {/* Chevron */}
          {showChevron && onClick && (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

// Specialized card variants
export const MobileInfoCard: React.FC<{
  readonly label: string;
  readonly value: string | number;
  readonly icon?: React.ReactNode;
  readonly trend?: 'up' | 'down' | 'neutral';
  readonly trendValue?: string;
  readonly className?: string;
}> = ({ label, value, icon, trend, trendValue, className = '' }) => {
  const getTrendClasses = (): string => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <MobileCard variant="outlined" className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={`text-sm font-medium ${getTrendClasses()}`}>
            {trendValue}
          </div>
        )}
      </div>
    </MobileCard>
  );
};

export const MobileActionCard: React.FC<{
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ReactNode;
  readonly actions: readonly {
    readonly label: string;
    readonly onClick: () => void;
    readonly variant?: 'primary' | 'secondary';
  }[];
  readonly className?: string;
}> = ({ title, description, icon, actions, className = '' }) => {
  return (
    <MobileCard variant="elevated" className={className} showChevron={false}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`mobile-btn flex-1 ${
                action.variant === 'primary' 
                  ? 'mobile-btn-primary' 
                  : 'mobile-btn-secondary'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </MobileCard>
  );
};

export const MobileListCard: React.FC<{
  readonly items: readonly {
    readonly id: string;
    readonly label: string;
    readonly value?: string;
    readonly icon?: React.ReactNode;
    readonly onClick?: () => void;
  }[];
  readonly title?: string;
  readonly className?: string;
}> = ({ items, title, className = '' }) => {
  return (
    <MobileCard variant="outlined" className={className} showChevron={false}>
      {title && (
        <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`flex items-center justify-between ${
              item.onClick ? 'cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded' : ''
            }`}
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <div className="w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
              )}
              <span className="text-gray-900">{item.label}</span>
            </div>
            
            {item.value && (
              <span className="text-gray-600 text-sm">{item.value}</span>
            )}
            
            {item.onClick && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </MobileCard>
  );
};
