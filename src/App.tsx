import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger,
} from "./components/ui/sidebar"
import { Separator } from "./components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import { memo, useState, useEffect } from "react"
import { startTransition } from 'react'
import { useSidebar } from "./components/ui/sidebar"
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

import AppRoutes from './routes'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/ErrorBoundary'
import PWAPrompt from './components/PWAPrompt'
import { SocketProvider } from './contexts/SocketContext'
import { OfflineProvider } from './contexts/OfflineContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import CommandPalette from './components/CommandPalette'
import AICommandCenter from './components/AICommandCenter'
import { useAICommandCenter } from './hooks/useAICommandCenter'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient, cacheUtils } from './lib/queryClient'
import OfflineIndicator from './components/OfflineIndicator'
import { useAuthStore } from './store/auth'
import { OnboardingModal } from './components/onboarding/OnboardingModal'
import { useOnboarding } from './hooks/useOnboarding'
import { onboardingSteps } from './constants/onboardingSteps.tsx'

// Import our modular components
import { AppSidebar } from './components/AppSidebar'
import { HeaderActions } from './components/HeaderActions'

// ==================== MAIN APP LAYOUT ====================
const AppLayout = memo(function AppLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const { toggleSidebar } = useSidebar()
  const {
    isOpen: isAIOpen,
    openCommandCenter,
    closeCommandCenter,
    actionContext,
    userId
  } = useAICommandCenter()

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleSidebar: toggleSidebar,
    onSearch: () => setIsCmdOpen(true),
    onCloseModal: () => {
      setIsCmdOpen(false)
      closeCommandCenter()
    },
    onHelp: () => {
      // Navigate to help page
      window.location.href = '/help'
    },
    onSettings: () => {
      // Navigate to settings
      window.location.href = '/settings'
    }
  })

  useEffect(() => {
    const open = () => {
      startTransition(() => {
        setIsCmdOpen(true)
      })
    }
    window.addEventListener('open-command-palette', open as any)
    return () => window.removeEventListener('open-command-palette', open as any)
  }, [])

  const toggleChat = () => {
    startTransition(() => {
      setIsChatOpen(!isChatOpen)
    })
  }

  const content = (
    <ErrorBoundary level="page">
      <AppRoutes />
    </ErrorBoundary>
  )

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Ana Sayfa
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4">
            <HeaderActions />
          </div>
        </header>
        {content}
      </SidebarInset>
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
      <PWAPrompt />
      <OfflineIndicator />
      {/* Chat container temporarily disabled */}
      {/* {user && (
        <ChatContainer
          currentUserId={user.id}
          isOpen={isChatOpen}
          onToggle={toggleChat}
        />
      )} */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        toggleChat={toggleChat}
        onOpenAICenter={openCommandCenter}
      />
      <AICommandCenter
        isOpen={isAIOpen}
        onClose={closeCommandCenter}
        context={actionContext}
        userId={userId}
      />
    </>
  )
})

// ==================== MAIN APP ====================
export default function App() {
  const { initializing, initialize } = useAuthStore()
  const { showOnboarding, completeOnboarding, closeOnboarding } = useOnboarding()

  // Initialize auth on app start
  useEffect(() => {
    initialize()
  }, [initialize])

  // Cache persistence için offline support
  useEffect(() => {
    // Uygulama başlarken cache'i yükle
    cacheUtils.loadFromStorage()

    // Sayfa kapatılırken cache'i kaydet
    const handleBeforeUnload = () => {
      cacheUtils.saveToStorage()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // Show loading screen while initializing auth
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Uygulama yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary level="global" showDetails={process.env.NODE_ENV === 'development'}>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <OfflineProvider>
              <SocketProvider>
                <SidebarProvider defaultOpen={false}>
                  <AppLayout />
                  <OnboardingModal
                    isOpen={showOnboarding}
                    onClose={closeOnboarding}
                    onComplete={completeOnboarding}
                    steps={onboardingSteps}
                  />
                </SidebarProvider>
              </SocketProvider>
            </OfflineProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
