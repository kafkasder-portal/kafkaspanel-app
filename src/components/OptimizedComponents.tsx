import React, { memo, useMemo } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import type { LucideIcon } from 'lucide-react'

// Memoized Badge component
export const MemoizedBadge = memo(function MemoizedBadge({ 
  children, 
  variant = 'default',
  className,
  ...props 
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge variant={variant} className={className} {...props}>
      {children}
    </Badge>
  )
})

// Memoized Button component
export const MemoizedButton = memo(function MemoizedButton({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  )
})

// Memoized Icon wrapper
interface MemoizedIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  'aria-hidden'?: boolean
}

export const MemoizedIcon = memo(function MemoizedIcon({ 
  icon: Icon, 
  className = "h-4 w-4",
  size,
  ...props 
}: MemoizedIconProps) {
  const iconProps = useMemo(() => ({
    className,
    ...(size && { size }),
    ...props
  }), [className, size, props])

  return <Icon {...iconProps} />
})

// Memoized Navigation Item
interface NavigationItemProps {
  title: string
  icon: LucideIcon
  badge?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export const MemoizedNavigationItem = memo(function MemoizedNavigationItem({
  title,
  icon,
  badge,
  isActive = false,
  onClick,
  className = ""
}: NavigationItemProps) {
  const buttonContent = useMemo(() => (
    <>
      <MemoizedIcon icon={icon} />
      <span className="font-medium">{title}</span>
      {badge && (
        <MemoizedBadge variant="secondary" className="ml-auto">
          {badge}
        </MemoizedBadge>
      )}
    </>
  ), [icon, title, badge])

  return (
    <MemoizedButton
      variant={isActive ? "default" : "ghost"}
      className={`w-full justify-start gap-2 ${className}`}
      onClick={onClick}
    >
      {buttonContent}
    </MemoizedButton>
  )
})

// Memoized List component for large datasets
interface MemoizedListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string | number
  className?: string
}

export function MemoizedList<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  className = "" 
}: MemoizedListProps<T>) {
  const renderedItems = useMemo(() => 
    items.map((item, index) => (
      <React.Fragment key={keyExtractor(item, index)}>
        {renderItem(item, index)}
      </React.Fragment>
    )), 
    [items, renderItem, keyExtractor]
  )

  return (
    <div className={className}>
      {renderedItems}
    </div>
  )
}

// Memoized Card component
interface MemoizedCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export const MemoizedCard = memo(function MemoizedCard({
  title,
  description,
  children,
  className = "",
  headerAction
}: MemoizedCardProps) {
  const header = useMemo(() => {
    if (!title && !headerAction) return null
    
    return (
      <div className="flex items-center justify-between p-6 pb-2">
        <div>
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {headerAction}
      </div>
    )
  }, [title, description, headerAction])

  return (
    <div className={`rounded-lg border bg-card ${className}`}>
      {header}
      <div className={title || headerAction ? "p-6 pt-2" : "p-6"}>
        {children}
      </div>
    </div>
  )
})

// Memoized Avatar component
interface MemoizedAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const MemoizedAvatar = memo(function MemoizedAvatar({
  src,
  alt = "",
  fallback = "U",
  size = 'md',
  className = ""
}: MemoizedAvatarProps) {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'sm': return 'h-6 w-6 text-xs'
      case 'lg': return 'h-12 w-12 text-lg'
      default: return 'h-8 w-8 text-sm'
    }
  }, [size])

  return (
    <div className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${sizeClasses} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted font-medium">
          {fallback}
        </div>
      )}
    </div>
  )
})

// Performance monitoring HOC
export function withPerformanceMonitoring<T extends {}>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return memo(function PerformanceMonitoredComponent(props: T) {
    if (process.env.NODE_ENV === 'development') {
      console.time(`${componentName} render`)
    }

    const result = <Component {...props} />

    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(`${componentName} render`)
    }

    return result
  })
}

// Hook for performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} mounted`)
      return () => console.log(`${componentName} unmounted`)
    }
  }, [componentName])
}
