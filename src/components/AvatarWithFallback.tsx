import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ImageWithFallback } from './ImageWithFallback'

interface AvatarWithFallbackProps {
  src?: string
  alt?: string
  fallback?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AvatarWithFallback({ 
  src, 
  alt, 
  fallback, 
  className = '',
  size = 'md' 
}: AvatarWithFallbackProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const fallbackSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {src ? (
        <AvatarImage 
          src={src} 
          alt={alt}
          onError={(e) => {
            // Avatar yüklenemezse fallback göster
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      ) : null}
      <AvatarFallback className={fallbackSize[size]}>
        {fallback || alt?.charAt(0) || 'U'}
      </AvatarFallback>
    </Avatar>
  )
}

// ImageWithFallback kullanan alternatif versiyon
export function AvatarWithImageFallback({ 
  src, 
  alt, 
  fallback, 
  className = '',
  size = 'md',
  showErrorIcon = false,
  errorText
}: AvatarWithFallbackProps & {
  showErrorIcon?: boolean
  errorText?: string
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  if (!src) {
    return (
      <Avatar className={`${sizeClasses[size]} ${className}`}>
        <AvatarFallback className="text-sm">
          {fallback || alt?.charAt(0) || 'U'}
        </AvatarFallback>
      </Avatar>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className} rounded-full overflow-hidden`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        fallbackClassName="w-full h-full flex items-center justify-center bg-muted"
        showErrorIcon={showErrorIcon}
        errorText={errorText}
      />
    </div>
  )
}
