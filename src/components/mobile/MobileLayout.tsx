/**
 * Mobile Layout Component
 * TypeScript best practices ile mobil layout wrapper
 */

import React, { useEffect, useState } from 'react';
import { MobileNavigation } from './MobileNavigation';
import { useViewportOptimization } from '@/hooks/useViewportOptimization';

interface MobileLayoutProps {
  readonly children: React.ReactNode;
  readonly showNavigation?: boolean;
  readonly showTopBar?: boolean;
  readonly topBarContent?: React.ReactNode;
  readonly navigationItems?: readonly any[];
  readonly className?: string;
  readonly safeArea?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  showNavigation = true,
  showTopBar = false,
  topBarContent,
  navigationItems,
  className = '',
  safeArea = true
}) => {
  const { isMobile, viewportHeight, isLandscape } = useViewportOptimization();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for top bar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate content height accounting for navigation
  const getContentHeight = (): string => {
    if (!isMobile) return 'min-h-screen';
    
    let height = viewportHeight;
    
    // Account for mobile navigation
    if (showNavigation) {
      height -= 80; // Navigation height
    }
    
    // Account for top bar
    if (showTopBar) {
      height -= 60; // Top bar height
    }
    
    // Account for safe area
    if (safeArea) {
      height -= 40; // Approximate safe area
    }
    
    return `min-h-[${height}px]`;
  };

  return (
    <div className={`relative ${safeArea ? 'mobile-safe-area' : ''} ${className}`}>
      {/* Top Bar */}
      {showTopBar && (
        <div className={`
          fixed top-0 left-0 right-0 z-40 
          bg-white border-b transition-all duration-200
          ${isScrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'}
          ${safeArea ? 'pt-safe-area-inset-top' : ''}
        `}>
          <div className="h-14 flex items-center justify-between px-4">
            {topBarContent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main 
        className={`
          ${getContentHeight()}
          ${showTopBar ? 'pt-14' : ''}
          ${showNavigation && isMobile ? 'pb-20' : ''}
          ${safeArea ? 'px-safe-area-inset-x' : ''}
        `}
      >
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {showNavigation && isMobile && (
        <MobileNavigation 
          items={navigationItems}
          className={safeArea ? 'pb-safe-area-inset-bottom' : ''}
        />
      )}

      {/* Landscape mode notice */}
      {isMobile && isLandscape && (
        <div className="fixed top-2 left-2 right-2 z-50 bg-orange-500 text-white text-center py-2 px-4 rounded text-sm">
          For better experience, please use portrait mode
        </div>
      )}
    </div>
  );
};

// Specialized mobile page layout
export const MobilePageLayout: React.FC<{
  readonly title: string;
  readonly subtitle?: string;
  readonly backButton?: boolean;
  readonly onBack?: () => void;
  readonly actions?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}> = ({ 
  title, 
  subtitle, 
  backButton = false, 
  onBack, 
  actions, 
  children, 
  className = '' 
}) => {
  return (
    <MobileLayout 
      showTopBar={true}
      className={className}
      topBarContent={
        <div className="flex items-center gap-3 w-full">
          {/* Back Button */}
          {backButton && (
            <button
              onClick={onBack || (() => window.history.back())}
              className="touch-target text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-600 truncate">
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      }
    >
      {children}
    </MobileLayout>
  );
};

// Mobile-optimized form layout
export const MobileFormLayout: React.FC<{
  readonly title: string;
  readonly children: React.ReactNode;
  readonly onSubmit?: () => void;
  readonly onCancel?: () => void;
  readonly submitLabel?: string;
  readonly cancelLabel?: string;
  readonly isSubmitting?: boolean;
  readonly className?: string;
}> = ({ 
  title, 
  children, 
  onSubmit, 
  onCancel, 
  submitLabel = 'Save', 
  cancelLabel = 'Cancel',
  isSubmitting = false,
  className = '' 
}) => {
  return (
    <MobilePageLayout
      title={title}
      backButton={true}
      onBack={onCancel}
      className={className}
    >
      <div className="space-y-6">
        {/* Form Content */}
        <div className="mobile-form">
          {children}
        </div>
        
        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
          <div className="flex gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="mobile-btn mobile-btn-secondary flex-1"
                disabled={isSubmitting}
              >
                {cancelLabel}
              </button>
            )}
            
            {onSubmit && (
              <button
                type="submit"
                onClick={onSubmit}
                className="mobile-btn mobile-btn-primary flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : submitLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </MobilePageLayout>
  );
};
