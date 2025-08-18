import React from 'react'
import { cn } from '@/lib/utils'

interface ResizerProps {
  className?: string
  onResize?: (delta: number) => void
  direction?: 'horizontal' | 'vertical'
}

export default function Resizer({ 
  className,
  onResize,
  direction = 'horizontal'
}: ResizerProps) {
  const [isResizing, setIsResizing] = React.useState(false)
  const [startPosition, setStartPosition] = React.useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    setStartPosition(direction === 'horizontal' ? e.clientX : e.clientY)
    e.preventDefault()
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      
      const currentPosition = direction === 'horizontal' ? e.clientX : e.clientY
      const delta = currentPosition - startPosition
      
      onResize?.(delta)
      setStartPosition(currentPosition)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, startPosition, direction, onResize])

  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn(
        // Base styles
        "absolute z-[6] select-none touch-none",
        // Horizontal resizer (default)
        direction === 'horizontal' && [
          "top-0 -right-[3px] h-full w-[6px]",
          "cursor-ew-resize hover:bg-border/50"
        ],
        // Vertical resizer
        direction === 'vertical' && [
          "left-0 -bottom-[3px] w-full h-[6px]",
          "cursor-ns-resize hover:bg-border/50"
        ],
        // Active state
        isResizing && "bg-primary/20",
        className
      )}
      onMouseDown={handleMouseDown}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        lineHeight: '16px',
        pointerEvents: 'all',
      }}
    />
  )
}

// Alternative simpler version without resize functionality
export function SimpleSeparator({ 
  className,
  direction = 'horizontal' 
}: { 
  className?: string
  direction?: 'horizontal' | 'vertical'
}) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn(
        "absolute bg-border",
        direction === 'horizontal' && "top-0 -right-[3px] h-full w-[1px]",
        direction === 'vertical' && "left-0 -bottom-[3px] w-full h-[1px]",
        className
      )}
    />
  )
}
