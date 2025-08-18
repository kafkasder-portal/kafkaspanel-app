import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  title: string
  icon: LucideIcon
  href?: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  subPages: SubPage[]
}

export interface SubPage {
  title: string
  href?: string
  description?: string
  badge?: string
  isNew?: boolean
  isUpdated?: boolean
  children?: SubPage[]
}

export interface SearchableItem {
  title: string
  description: string
  href: string
  icon?: LucideIcon
  badge?: string
  category: string
  parent?: string
  keywords?: string[]
  priority?: number
}

export interface QuickAccessItem {
  title: string
  href: string
  icon: LucideIcon
  category: string
  description?: string
  badge?: string
}

export interface SupportItem {
  title: string
  icon: LucideIcon
  href: string
  description: string
  external?: boolean
}

export interface MenuSection {
  title: string
  items: NavigationItem[]
}

export interface BreadcrumbItem {
  title: string
  href?: string
  icon?: LucideIcon
}

export interface NavigationState {
  activeItem?: string
  openPopover?: string
  searchQuery: string
  isSearchOpen: boolean
  recentItems: string[]
  favoriteItems: string[]
}

export interface NavigationActions {
  setActiveItem: (item: string) => void
  setOpenPopover: (popover: string | null) => void
  setSearchQuery: (query: string) => void
  toggleSearch: () => void
  addToRecent: (item: string) => void
  toggleFavorite: (item: string) => void
}

export type NavigationContextType = NavigationState & NavigationActions
