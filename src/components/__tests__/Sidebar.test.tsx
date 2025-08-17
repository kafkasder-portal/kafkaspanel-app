import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SidebarProvider } from '../ui/sidebar'
import { AppSidebar } from '../AppSidebar'
import { HeaderActions } from '../HeaderActions'

// Mock the auth store
vi.mock('../../store/auth', () => ({
  useAuthStore: () => ({
    user: { email: 'test@example.com' },
    profile: { full_name: 'Test User', avatar_url: null },
    initializing: false,
    initialize: vi.fn()
  })
}))

// Mock the theme hook
vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ({
    isDark: false,
    toggleMode: vi.fn()
  })
}))

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}))

describe('Sidebar System', () => {
  it('renders sidebar with navigation items', () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    )

    // Check if main navigation items are rendered
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument()
    expect(screen.getByText('Yardım Yönetimi')).toBeInTheDocument()
    expect(screen.getByText('Bağış Yönetimi')).toBeInTheDocument()
  })

  it('renders header actions with search and theme toggle', () => {
    render(<HeaderActions />)

    // Check if search button is rendered
    expect(screen.getByTitle('Hızlı Arama (Ctrl+K)')).toBeInTheDocument()
    
    // Check if theme toggle is rendered
    expect(screen.getByTitle('Tema Değiştir')).toBeInTheDocument()
  })

  it('shows user profile information', () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    )

    // Check if user name is displayed
    expect(screen.getByText('Test User')).toBeInTheDocument()
    
    // Check if user email is displayed
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
  })

  it('displays company branding', () => {
    render(
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    )

    // Check if company name is displayed
    expect(screen.getByText('Kafkas Portal')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })
})
