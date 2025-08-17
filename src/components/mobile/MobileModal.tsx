/**
 * Mobile Modal Component
 * TypeScript best practices ile mobil modal komponenti
 */

import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useSwipeGestures } from '@/hooks/useSwipeGestures';

interface MobileModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'full';
  readonly position?: 'bottom' | 'center' | 'top';
  readonly showHandle?: boolean;
  readonly showCloseButton?: boolean;
  readonly swipeToClose?: boolean;
  readonly preventClose?: boolean;
  readonly footer?: React.ReactNode;
  readonly onSwipeStart?: () => void;
  readonly onSwipeEnd?: () => void;
}

export const MobileModal: React.FC<MobileModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = '',
  size = 'md',
  position = 'bottom',
  showHandle = true,
  showCloseButton = true,
  swipeToClose = true,
  preventClose = false,
  footer,
  onSwipeStart,
  onSwipeEnd
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Swipe gestures for closing
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGestures({
    onSwipeDown: swipeToClose ? onClose : undefined,
    threshold: 100,
    onSwipeStart,
    onSwipeEnd
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
      
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        // Restore body scroll
        document.body.style.overflow = '';
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !preventClose) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !preventClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, preventClose]);

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'max-h-[50vh]';
      case 'md':
        return 'max-h-[70vh]';
      case 'lg':
        return 'max-h-[85vh]';
      case 'full':
        return 'h-full';
      default:
        return 'max-h-[70vh]';
    }
  };

  const getPositionClasses = (): string => {
    switch (position) {
      case 'center':
        return 'items-center justify-center p-4';
      case 'top':
        return 'items-start justify-center pt-20 p-4';
      case 'bottom':
      default:
        return 'items-end justify-center';
    }
  };

  const getContentClasses = (): string => {
    const baseClasses = 'mobile-modal-content';
    
    if (position === 'bottom') {
      return `${baseClasses} ${getSizeClasses()}`;
    }
    
    return `${baseClasses} rounded-lg ${getSizeClasses()} max-w-md w-full`;
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={modalRef}
      className={`mobile-modal ${isOpen ? 'open' : ''} ${getPositionClasses()}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Content */}
      <div
        ref={contentRef}
        className={`${getContentClasses()} ${className}`}
        onTouchStart={swipeToClose ? onTouchStart : undefined}
        onTouchMove={swipeToClose ? onTouchMove : undefined}
        onTouchEnd={swipeToClose ? onTouchEnd : undefined}
      >
        {/* Drag Handle */}
        {showHandle && position === 'bottom' && (
          <div className="mobile-modal-handle" />
        )}
        
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            
            {showCloseButton && !preventClose && (
              <button
                onClick={onClose}
                className="touch-target text-gray-400 hover:text-gray-600 ml-4"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Specialized modal variants
export const MobileActionModal: React.FC<{
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly message: string;
  readonly actions: readonly {
    readonly label: string;
    readonly onClick: () => void;
    readonly variant?: 'primary' | 'secondary' | 'danger';
  }[];
}> = ({ isOpen, onClose, title, message, actions }) => {
  const getButtonClasses = (variant: string): string => {
    const baseClasses = 'mobile-btn flex-1';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} mobile-btn-primary`;
      case 'danger':
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      case 'secondary':
      default:
        return `${baseClasses} mobile-btn-secondary`;
    }
  };

  return (
    <MobileModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      position="center"
      showHandle={false}
    >
      <div className="space-y-6">
        <p className="text-gray-600">{message}</p>
        
        <div className="flex gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={getButtonClasses(action.variant || 'secondary')}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </MobileModal>
  );
};

export const MobileBottomSheet: React.FC<{
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly actions?: readonly {
    readonly label: string;
    readonly onClick: () => void;
    readonly icon?: React.ReactNode;
  }[];
}> = ({ isOpen, onClose, title, children, actions }) => {
  return (
    <MobileModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      position="bottom"
      showHandle={true}
      swipeToClose={true}
      footer={actions && (
        <div className="space-y-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="mobile-btn mobile-btn-secondary w-full flex items-center justify-center gap-2"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    >
      {children}
    </MobileModal>
  );
};
