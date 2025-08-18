import React, { memo, useState } from 'react'
import { Search, Sun, Moon, Settings, Command } from 'lucide-react'
import { Button } from './ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from './ui/dialog'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { useTheme } from '@/hooks/useTheme'
import { useSearch } from '@/hooks/useSearch'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export const HeaderActions = memo(function HeaderActions() {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { 
    isSearchOpen, 
    searchQuery, 
    filteredPages, 
    openSearch, 
    closeSearch, 
    setSearchQuery 
  } = useSearch()

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: openSearch,
    onCloseModal: closeSearch
  })

  return (
    <div className="flex items-center gap-2">
      {/* Quick Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="w-auto justify-start text-sm text-muted-foreground"
            onClick={openSearch}
          >
            <Search className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Ara...</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:inline-flex">
                <Command className="h-3 w-3" />
                K
              </kbd>
            </div>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Hızlı Arama
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Sayfa, menü veya özellik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              autoFocus
            />
            
            {searchQuery && (
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {filteredPages.length > 0 ? (
                    filteredPages.map((page, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => {
                          // Navigate to page
                          window.location.href = page.href || '#'
                          closeSearch()
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-md">
                            {page.icon && <page.icon className="h-4 w-4 text-primary" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{page.title}</h4>
                            <p className="text-sm text-muted-foreground">{page.description}</p>
                          </div>
                        </div>
                        {page.badge && (
                          <Badge variant="secondary">{page.badge}</Badge>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Arama sonucu bulunamadı</p>
                      <p className="text-sm">Farklı kelimeler deneyin</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            )}
            
            {!searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Hızlı Erişim</h4>
                  <div className="space-y-1">
                    {[
                      { title: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
                      { title: 'Bağışlar', href: '/donations', icon: 'Coins' },
                      { title: 'Yardımlar', href: '/aid', icon: 'Heart' },
                      { title: 'Raporlar', href: '/reports', icon: 'FileText' }
                    ].map((item) => (
                      <button
                        key={item.href}
                        className="w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm"
                        onClick={() => {
                          window.location.href = item.href
                          closeSearch()
                        }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Son Kullanılan</h4>
                  <div className="space-y-1">
                    {[
                      { title: 'Bağış Listesi', href: '/donations' },
                      { title: 'Yeni Başvuru', href: '/aid/applications' },
                      { title: 'Mesaj Gönder', href: '/messages/bulk-send' }
                    ].map((item) => (
                      <button
                        key={item.href}
                        className="w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm text-muted-foreground"
                        onClick={() => {
                          window.location.href = item.href
                          closeSearch()
                        }}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        className="h-9 w-9"
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="sr-only">
          {isDarkMode ? 'Açık tema' : 'Koyu tema'}
        </span>
      </Button>

      {/* Settings Button (Optional) */}
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => {
          // Open settings modal or navigate to settings
          console.log('Settings clicked')
        }}
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Ayarlar</span>
      </Button>
    </div>
  )
})

export default HeaderActions
