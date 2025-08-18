import React, { memo, startTransition } from "react"
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSidebar } from "./ui/sidebar"
import { useAuthStore } from "../store/auth"
import { useTheme } from "../hooks/useTheme"
import { navigation, supportItems } from "../constants/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { TooltipProvider } from "./ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Building2,
  ChevronUp,
  Bell,
  User2,
  LogOut,
  Settings,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  }
}

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
}

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

export const AppSidebar = memo(function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const { user, profile } = useAuthStore()
  const userProfile = profile
  const navigate = useNavigate()
  const { isDark, toggleMode } = useTheme()
  const [openPopover, setOpenPopover] = React.useState<string | null>(null)

  const handleNavigation = (url: string) => {
    console.log('handleNavigation called with URL:', url)
    startTransition(() => {
      console.log('Navigating to:', url)
      navigate(url)
    })
    // Close popover and sidebar
    setOpenPopover(null)
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleIconClick = (item: any) => {
    console.log('Icon clicked:', item.title, 'URL:', item.url)
    // Navigate to main module page if URL exists
    if (item.url) {
      console.log('Navigating to:', item.url)
      handleNavigation(item.url)
    }
    // Also open/toggle popover for sub-pages
    setOpenPopover(openPopover === item.title ? null : item.title)
  }

  const handleSupportIconClick = (item: any) => {
    // Navigate to support page if URL exists
    if (item.url) {
      handleNavigation(item.url)
    }
    // Also open/toggle popover for sub-pages
    const popoverKey = `support-${item.title}`
    setOpenPopover(openPopover === popoverKey ? null : popoverKey)
  }

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked')
  }

  return (
    <TooltipProvider>
      <Sidebar variant="inset" collapsible="icon" className="data-[state=collapsed]:w-16">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <SidebarMenuButton size="lg" className="data-[size=lg]:h-12">
                  <motion.div 
                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Building2 className="size-4" />
                  </motion.div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate">Kafkas Portal</span>
                    <span className="truncate text-xs text-muted-foreground">Enterprise</span>
                  </div>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {/* Ana Navigasyon */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigasyon</SidebarGroupLabel>
            <SidebarGroupContent>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <SidebarMenu>
                  {navigation.map((item, index) => (
                    <motion.div key={item.title} variants={staggerItem}>
                      <SidebarMenuItem>
                        <Popover
                          open={openPopover === item.title}
                          onOpenChange={(open) => setOpenPopover(open ? item.title : null)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                          >
                            <SidebarMenuButton
                              className="relative w-full"
                              tooltip={item.title}
                              onClick={() => handleIconClick(item)}
                              asChild={false}
                            >
                              <motion.div
                                whileHover={{ rotate: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <item.icon className="size-4" />
                              </motion.div>
                              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                              {item.badge && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                                  className="group-data-[collapsible=icon]:hidden"
                                >
                                  <Badge variant="secondary" className="ml-auto h-5 w-auto px-1.5 text-xs">
                                    {item.badge}
                                  </Badge>
                                </motion.div>
                              )}
                              <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="group-data-[collapsible=icon]:hidden"
                              >
                                <ChevronRight className="ml-auto size-4" />
                              </motion.div>
                            </SidebarMenuButton>
                          </motion.div>
                          <PopoverContent 
                            side="right" 
                            align="start" 
                            sideOffset={8}
                            className="w-56 p-3"
                          >
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              variants={staggerContainer}
                              className="space-y-1"
                            >
                              <motion.div 
                                className="flex items-center gap-2 pb-2 border-b"
                                variants={staggerItem}
                              >
                                <item.icon className="size-4" />
                                <span className="font-medium">{item.title}</span>
                                {item.badge && (
                                  <Badge variant="secondary" className="h-5 w-auto px-1.5 text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </motion.div>
                              {item.subPages?.map((subPage, subIndex) => (
                                <motion.div key={subIndex} variants={staggerItem}>
                                  <motion.div
                                    whileHover={{ scale: 1.02, x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start h-8"
                                      onClick={() => handleNavigation(subPage.url)}
                                    >
                                      {subPage.title}
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </PopoverContent>
                        </Popover>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Destek */}
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <SidebarMenu>
                  {supportItems.map((item) => (
                    <motion.div key={item.title} variants={staggerItem}>
                      <SidebarMenuItem>
                        <Popover
                          open={openPopover === `support-${item.title}`}
                          onOpenChange={(open) => setOpenPopover(open ? `support-${item.title}` : null)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                          >
                            <SidebarMenuButton
                              className="w-full"
                              tooltip={item.title}
                              onClick={() => handleSupportIconClick(item)}
                              asChild={false}
                            >
                              <motion.div
                                whileHover={{ rotate: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <item.icon className="size-4" />
                              </motion.div>
                              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                              <motion.div
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                                className="group-data-[collapsible=icon]:hidden"
                              >
                                <ChevronRight className="ml-auto size-4" />
                              </motion.div>
                            </SidebarMenuButton>
                          </motion.div>
                          <PopoverContent 
                            side="right" 
                            align="start" 
                            sideOffset={8}
                            className="w-56 p-3"
                          >
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              variants={staggerContainer}
                              className="space-y-1"
                            >
                              <motion.div 
                                className="flex items-center gap-2 pb-2 border-b"
                                variants={staggerItem}
                              >
                                <item.icon className="size-4" />
                                <span className="font-medium">{item.title}</span>
                              </motion.div>
                              {item.subPages?.map((subPage, index) => (
                                <motion.div key={index} variants={staggerItem}>
                                  <motion.div
                                    whileHover={{ scale: 1.02, x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start h-8"
                                      onClick={() => handleNavigation(subPage.url)}
                                    >
                                      {subPage.title}
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </PopoverContent>
                        </Popover>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </motion.div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            {/* Theme Toggle */}
            <SidebarMenuItem>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full justify-start px-2"
                  onClick={toggleMode}
                  title={isDark ? 'Light Mode' : 'Dark Mode'}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: isDark ? 180 : 0 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ rotate: isDark ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDark ? (
                      <Sun className="size-4" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                  </motion.div>
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </Button>
              </motion.div>
            </SidebarMenuItem>

            {/* User Profile */}
            <SidebarMenuItem>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideIn}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={userProfile?.avatar_url} alt={user?.email} />
                            <AvatarFallback className="rounded-lg">
                              {user?.email?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                          <span className="truncate">
                            {userProfile?.full_name || user?.email?.split('@')[0] || 'Kullanıcı'}
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {user?.email}
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="group-data-[collapsible=icon]:hidden"
                        >
                          <ChevronUp className="ml-auto size-4" />
                        </motion.div>
                      </SidebarMenuButton>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      {[
                        { icon: User2, text: "Profil", action: () => handleNavigation('/profile') },
                        { icon: Bell, text: "Bildirimler", action: () => handleNavigation('/notifications') },
                        { icon: Settings, text: "Hesap Ayarları", action: () => handleNavigation('/settings') },
                        { icon: LogOut, text: "Çıkış Yap", action: handleLogout, destructive: true }
                      ].map((item, index) => (
                        <motion.div key={index} variants={staggerItem}>
                          <DropdownMenuItem 
                            className={item.destructive ? "text-destructive" : ""}
                            onClick={item.action}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.text}
                          </DropdownMenuItem>
                        </motion.div>
                      ))}
                    </motion.div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
})
