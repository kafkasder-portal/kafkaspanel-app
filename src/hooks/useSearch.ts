import { useState, useMemo } from "react"
import { getAllPages } from "../constants/navigation"

export function useSearch() {
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