import { useState, useMemo } from 'react'
import { navigation } from '@/constants/navigation'
import type { SearchableItem } from '@/types/navigation'

export const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Flatten navigation structure to searchable items
  const searchableItems = useMemo<SearchableItem[]>(() => {
    const items: SearchableItem[] = []
    
    navigation.forEach(navItem => {
      // Add main navigation items
      items.push({
        title: navItem.title,
        description: `${navItem.title} bölümü`,
        href: navItem.href || '#',
        icon: navItem.icon,
        badge: navItem.badge,
        category: 'Navigasyon'
      })
      
      // Add sub-pages
      if (navItem.subPages) {
        navItem.subPages.forEach(subPage => {
          items.push({
            title: subPage.title,
            description: `${navItem.title} > ${subPage.title}`,
            href: subPage.href || '#',
            icon: navItem.icon,
            category: navItem.title,
            parent: navItem.title
          })
        })
      }
    })

    // Add additional searchable content
    const additionalItems = [
      {
        title: 'Kullanıcı Ayarları',
        description: 'Profil ve hesap ayarları',
        href: '/settings/profile',
        category: 'Ayarlar'
      },
      {
        title: 'Sistem Ayarları',
        description: 'Genel sistem yapılandırması',
        href: '/settings/system',
        category: 'Ayarlar'
      },
      {
        title: 'Güvenlik',
        description: 'Güvenlik ve gizlilik ayarları',
        href: '/settings/security',
        category: 'Ayarlar'
      },
      {
        title: 'Bildirimler',
        description: 'Bildirim tercihleri',
        href: '/settings/notifications',
        category: 'Ayarlar'
      },
      {
        title: 'Yardım',
        description: 'Yardım ve destek',
        href: '/help',
        category: 'Destek'
      },
      {
        title: 'İletişim',
        description: 'İletişim bilgileri',
        href: '/contact',
        category: 'Destek'
      }
    ]

    return [...items, ...additionalItems]
  }, [])

  // Filter items based on search query
  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase().trim()
    
    return searchableItems.filter(item => {
      const searchText = [
        item.title,
        item.description,
        item.category,
        item.parent
      ].filter(Boolean).join(' ').toLowerCase()
      
      return searchText.includes(query)
    }).slice(0, 10) // Limit results
  }, [searchQuery, searchableItems])

  const openSearch = () => {
    setIsSearchOpen(true)
    setSearchQuery('')
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return {
    isSearchOpen,
    searchQuery,
    filteredPages,
    searchableItems,
    openSearch,
    closeSearch,
    clearSearch,
    setSearchQuery,
    hasResults: filteredPages.length > 0
  }
}
