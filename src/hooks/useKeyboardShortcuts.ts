import { useEffect } from "react"

interface KeyboardShortcuts {
  onSearch?: () => void
  onToggleSidebar?: () => void
  onCloseModal?: () => void
}

export function useKeyboardShortcuts({ 
  onSearch, 
  onToggleSidebar, 
  onCloseModal 
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K ile arama açma
      if (e.ctrlKey && e.key === 'k' && onSearch) {
        e.preventDefault()
        onSearch()
      }
      
      // Ctrl+B ile sidebar toggle
      if (e.ctrlKey && e.key === 'b' && onToggleSidebar) {
        e.preventDefault()
        onToggleSidebar()
      }
      
      // ESC ile modal kapatma
      if (e.key === 'Escape' && onCloseModal) {
        onCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch, onToggleSidebar, onCloseModal])
}