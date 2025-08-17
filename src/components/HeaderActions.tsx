import { memo, useState, useEffect, useMemo } from "react"
import { useTheme } from "../hooks/useTheme"
import { getAllPages } from "../constants/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import {
  Search,
  Moon,
  Sun,
} from "lucide-react"
import { motion } from "motion/react"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
}

interface KeyboardShortcuts {
  onSearch?: () => void
  onToggleSidebar?: () => void
  onCloseModal?: () => void
}

// Search hook
function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const allPages = useMemo(() => getAllPages(), [])

  // Arama sonuçlarını filtreleme - memoized
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return allPages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.category.toLowerCase().includes(query)
    )
  }, [searchQuery, allPages])

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return {
    isSearchOpen,
    searchQuery,
    filteredPages,
    allPages,
    setSearchQuery,
    openSearch,
    closeSearch
  }
}

// Keyboard shortcuts hook
function useKeyboardShortcuts({ 
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

export const HeaderActions = memo(function HeaderActions() {
  const { isDark, toggleMode } = useTheme()
  const {
    isSearchOpen,
    searchQuery,
    filteredPages,
    setSearchQuery,
    openSearch,
    closeSearch
  } = useSearch()

  useKeyboardShortcuts({
    onSearch: openSearch,
    onCloseModal: closeSearch
  })

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Arama Butonu */}
      <Dialog open={isSearchOpen} onOpenChange={closeSearch}>
        <motion.div variants={staggerItem}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={openSearch}
              className="relative h-9 w-9 p-0 md:h-8 md:w-64 md:justify-start md:px-3 md:py-2"
              title="Hızlı Arama (Ctrl+K)"
            >
              <motion.div
                animate={{ 
                  rotate: isSearchOpen ? 90 : 0,
                  scale: isSearchOpen ? 1.1 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <Search className="h-4 w-4 md:mr-2" />
              </motion.div>
              <span className="hidden md:inline-flex flex-1 text-left">Ara...</span>
              <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </motion.div>
        </motion.div>
        <DialogContent className="sm:max-w-[425px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <DialogHeader>
              <motion.div variants={staggerItem}>
                <DialogTitle>Hızlı Arama</DialogTitle>
                <DialogDescription>
                  Sayfa ve özellik arayın
                </DialogDescription>
              </motion.div>
            </DialogHeader>
            <div className="space-y-4">
              <motion.div className="relative" variants={staggerItem}>
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sayfa ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                  autoFocus
                />
              </motion.div>
              <motion.div className="max-h-64 overflow-y-auto space-y-1" variants={staggerItem}>
                {filteredPages.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    {filteredPages.map((page, index) => (
                      <motion.div key={`${page.category}-${page.title}-${index}`} variants={staggerItem}>
                        <motion.div
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-auto p-3"
                            onClick={closeSearch}
                          >
                            <motion.div
                              whileHover={{ rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <page.icon className="mr-3 h-4 w-4" />
                            </motion.div>
                            <div className="text-left">
                              <div className="font-medium">{page.title}</div>
                              <div className="text-xs text-muted-foreground">{page.category}</div>
                            </div>
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>                ) : searchQuery ? (
                  <motion.div
                    className="text-center py-6 text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sonuç bulunamadı
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-6 text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Arama yapmaya başlayın
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Dark Mode Toggle */}
      <motion.div variants={staggerItem}>
        <motion.div
          whileHover={{ scale: 1.05, rotate: isDark ? 180 : 0 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMode}
            className="h-9 w-9 p-0"
            title="Tema Değiştir"
          >
            <motion.div
              initial={false}
              animate={{ 
                scale: isDark ? [1, 0, 1] : [1, 0, 1],
                rotate: isDark ? 0 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})