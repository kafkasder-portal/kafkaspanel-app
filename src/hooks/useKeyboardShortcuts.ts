import { useEffect, useCallback } from 'react'

interface KeyboardShortcutHandlers {
  onToggleSidebar?: () => void
  onSearch?: () => void
  onCloseModal?: () => void
  onSettings?: () => void
  onHelp?: () => void
  onNewItem?: () => void
  onSave?: () => void
  onEscape?: () => void
}

interface ShortcutConfig {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key, ctrlKey, metaKey, shiftKey, altKey } = event
    
    // Use Cmd on Mac, Ctrl on other platforms
    const modifierKey = navigator.platform.includes('Mac') ? metaKey : ctrlKey
    
    // Define shortcuts
    const shortcuts: Array<{
      config: ShortcutConfig
      handler: () => void
      description: string
    }> = [
      {
        config: { key: 'b', ctrlKey: true, metaKey: true },
        handler: () => handlers.onToggleSidebar?.(),
        description: 'Toggle Sidebar'
      },
      {
        config: { key: 'k', ctrlKey: true, metaKey: true },
        handler: () => handlers.onSearch?.(),
        description: 'Quick Search'
      },
      {
        config: { key: 'Escape' },
        handler: () => handlers.onCloseModal?.() || handlers.onEscape?.(),
        description: 'Close Modal/Escape'
      },
      {
        config: { key: ',', ctrlKey: true, metaKey: true },
        handler: () => handlers.onSettings?.(),
        description: 'Settings'
      },
      {
        config: { key: '?', shiftKey: true },
        handler: () => handlers.onHelp?.(),
        description: 'Help'
      },
      {
        config: { key: 'n', ctrlKey: true, metaKey: true },
        handler: () => handlers.onNewItem?.(),
        description: 'New Item'
      },
      {
        config: { key: 's', ctrlKey: true, metaKey: true },
        handler: () => handlers.onSave?.(),
        description: 'Save'
      }
    ]

    // Check each shortcut
    for (const shortcut of shortcuts) {
      const { config, handler } = shortcut
      
      // Check if key matches
      if (key !== config.key) continue
      
      // Check modifiers
      const ctrlMatch = config.ctrlKey ? (ctrlKey || metaKey) : !ctrlKey && !metaKey
      const metaMatch = config.metaKey ? (metaKey || ctrlKey) : !metaKey && !ctrlKey
      const shiftMatch = config.shiftKey ? shiftKey : !shiftKey
      const altMatch = config.altKey ? altKey : !altKey
      
      if (ctrlMatch && metaMatch && shiftMatch && altMatch) {
        if (config.preventDefault !== false) {
          event.preventDefault()
        }
        if (config.stopPropagation) {
          event.stopPropagation()
        }
        
        handler()
        break
      }
    }
  }, [handlers])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Return available shortcuts for documentation
  const getShortcuts = useCallback(() => {
    const isMac = navigator.platform.includes('Mac')
    const modifierSymbol = isMac ? '⌘' : 'Ctrl'
    
    return [
      { keys: `${modifierSymbol}+B`, description: 'Sidebar\'ı aç/kapat' },
      { keys: `${modifierSymbol}+K`, description: 'Hızlı arama' },
      { keys: 'Esc', description: 'Modal\'ı kapat' },
      { keys: `${modifierSymbol}+,`, description: 'Ayarlar' },
      { keys: 'Shift+?', description: 'Yardım' },
      { keys: `${modifierSymbol}+N`, description: 'Yeni öğe' },
      { keys: `${modifierSymbol}+S`, description: 'Kaydet' }
    ]
  }, [])

  return {
    getShortcuts
  }
}

// Custom hook for specific shortcut combinations
export const useSpecificShortcut = (
  shortcut: ShortcutConfig,
  handler: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event
      
      if (key === shortcut.key) {
        const ctrlMatch = shortcut.ctrlKey ? (ctrlKey || metaKey) : true
        const metaMatch = shortcut.metaKey ? (metaKey || ctrlKey) : true
        const shiftMatch = shortcut.shiftKey ? shiftKey : !shiftKey
        const altMatch = shortcut.altKey ? altKey : !altKey
        
        if (ctrlMatch && metaMatch && shiftMatch && altMatch) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault()
          }
          handler()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, dependencies)
}
