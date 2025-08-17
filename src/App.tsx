import { DashboardLayout } from './layouts/DashboardLayout'
import AppRoutes from './routes'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/ErrorBoundary'
import PWAPrompt from './components/PWAPrompt'
import { SocketProvider } from './contexts/SocketContext'
import { OfflineProvider } from './contexts/OfflineContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import ChatContainer from './components/Chat/ChatContainer'
import { useState, useEffect, startTransition } from 'react'
import CommandPalette from './components/CommandPalette'
import AICommandCenter from './components/AICommandCenter'
import { useAICommandCenter } from './hooks/useAICommandCenter'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient, cacheUtils } from './lib/queryClient'
import OfflineIndicator from './components/OfflineIndicator'
import { useAuthStore } from './store/auth'
import { OnboardingModal } from './components/onboarding/OnboardingModal'
import { OnboardingTestButton } from './components/onboarding/OnboardingTestButton'
import { useOnboarding } from './hooks/useOnboarding'
import { onboardingSteps } from './constants/onboardingSteps.tsx'
import { PWAWrapper } from './components/pwa/PWAWrapper'
import { RealtimeNotificationCenter } from './components/realtime/RealtimeNotificationCenter'
import { CollaborationPanel } from './components/realtime/CollaborationPanel'
import { WebSocketStatus } from './components/realtime/WebSocketStatus'
import { MobileLayout } from './components/mobile/MobileLayout'
import { useViewportOptimization } from './hooks/useViewportOptimization'

// Inner component that uses theme-dependent hooks
function AppContent({ 
  user, 
  resetOnboarding, 
  setShowOnboarding 
}: { 
  user: any
  resetOnboarding: () => void
  setShowOnboarding: (show: boolean) => void
}) {
  const { isMobile } = useViewportOptimization()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const {
    isOpen: isAIOpen,
    openCommandCenter,
    closeCommandCenter,
    actionContext,
    userId
  } = useAICommandCenter()

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

  return isMobile ? (
    <MobileLayout showNavigation={true}>
      {content}
      <Toaster
        position="top-center"
        expand={false}
        richColors
        closeButton
      />
      <PWAPrompt />
      <OfflineIndicator />
      {user && (
        <ChatContainer
          currentUserId={user.id}
          isOpen={isChatOpen}
          onToggle={toggleChat}
        />
      )}
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
      <RealtimeNotificationCenter position="top-right" />
      <WebSocketStatus
        variant="badge"
        className="fixed bottom-20 right-4 z-30"
        showLatency={true}
        showReconnectButton={true}
      />
    </MobileLayout>
  ) : (
    <DashboardLayout onOpenAICenter={openCommandCenter}>
      {content}
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
      />
      <PWAPrompt />
      <OfflineIndicator />
      {user && (
        <ChatContainer
          currentUserId={user.id}
          isOpen={isChatOpen}
          onToggle={toggleChat}
        />
      )}
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
      {/* Real-time components */}
      <RealtimeNotificationCenter position="top-right" />
      <CollaborationPanel position="right" minimizable={true} />
      <WebSocketStatus 
        variant="badge" 
        className="fixed bottom-4 right-4 z-30" 
        showLatency={true}
        showReconnectButton={true}
      />
      
      {process.env.NODE_ENV === 'development' && (
        <OnboardingTestButton
          onReset={resetOnboarding}
          onStart={() => setShowOnboarding(true)}
        />
      )}
    </DashboardLayout>
  )
}

export default function App() {
  const { initializing, initialize } = useAuthStore()
  const { user } = useAuthStore()
  const { showOnboarding, completeOnboarding, resetOnboarding, setShowOnboarding, closeOnboarding } = useOnboarding()

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
                <PWAWrapper
                  showInstallBanner={true}
                  showUpdateNotification={true}
                  showOfflineStatus={true}
                  installBannerVariant="floating"
                  updateNotificationVariant="toast"
                  offlineStatusVariant="icon"
                >
                  <AppContent 
                    user={user}
                    resetOnboarding={resetOnboarding}
                    setShowOnboarding={setShowOnboarding}
                  />
                  <OnboardingModal
                    isOpen={showOnboarding}
                    onClose={closeOnboarding}
                    onComplete={completeOnboarding}
                    steps={onboardingSteps}
                  />
                </PWAWrapper>
              </SocketProvider>
            </OfflineProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
