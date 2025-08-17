import {
  Home,
  BarChart3,
  Users,
  FileText,
  Settings,
  HelpCircle,
  Calendar,
  FolderOpen,
  MessageSquare,
  DollarSign,
  Building2,
  TrendingUp,
  Bell,
  User2,
  LogOut,
  ChevronRight,
  Search,
  Moon,
  Sun,
} from "lucide-react"

export interface SubPage {
  title: string
  url: string
}

export interface NavigationItem {
  title: string
  icon: any
  badge?: string
  subPages: SubPage[]
}

// Ana navigasyon öğeleri ve alt sayfaları
export const navigation: NavigationItem[] = [
  {
    title: "Ana Sayfa",
    icon: Home,
    subPages: [
      { title: "Dashboard", url: "/" },
      { title: "Genel Bakış", url: "/dashboard" },
      { title: "Hızlı Eylemler", url: "/quick-actions" },
    ]
  },
  {
    title: "Yardım Yönetimi",
    icon: BarChart3,
    badge: "Yeni",
    subPages: [
      { title: "Başvurular", url: "/aid/applications" },
      { title: "Yararlanıcılar", url: "/aid/beneficiaries" },
      { title: "Yardım Kayıtları", url: "/aid/records" },
      { title: "Raporlar", url: "/aid/reports" },
    ]
  },
  {
    title: "Bağış Yönetimi",
    icon: DollarSign,
    subPages: [
      { title: "Nakit Bağışlar", url: "/donations/cash" },
      { title: "Banka Bağışları", url: "/donations/bank" },
      { title: "Toplu Sağlama", url: "/donations/bulk" },
      { title: "Bağış Analizi", url: "/donations/analytics" },
    ]
  },
  {
    title: "Burs Yönetimi",
    icon: FileText,
    subPages: [
      { title: "Burs Başvuruları", url: "/scholarship/applications" },
      { title: "Öğrenci Yönetimi", url: "/scholarship/students" },
      { title: "Kampanyalar", url: "/scholarship/campaigns" },
      { title: "Raporlar", url: "/scholarship/reports" },
    ]
  },
  {
    title: "Fon Yönetimi",
    icon: Building2,
    subPages: [
      { title: "Fon Kartları", url: "/fund/cards" },
      { title: "Fon Analizi", url: "/fund/analytics" },
      { title: "Performans Takibi", url: "/fund/performance" },
      { title: "Raporlar", url: "/fund/reports" },
    ]
  },
  {
    title: "Mesaj Yönetimi",
    icon: MessageSquare,
    badge: "12",
    subPages: [
      { title: "Toplu Gönderim", url: "/messages/bulk" },
      { title: "Gelişmiş Gönderim", url: "/messages/enhanced" },
      { title: "Analitik", url: "/messages/analytics" },
      { title: "Şablonlar", url: "/messages/templates" },
    ]
  },
  {
    title: "Toplantılar",
    icon: Calendar,
    subPages: [
      { title: "Toplantı Listesi", url: "/meetings" },
      { title: "Yeni Toplantı", url: "/meetings/new" },
      { title: "Takvim Görünümü", url: "/meetings/calendar" },
    ]
  },
  {
    title: "Görevler",
    icon: FolderOpen,
    subPages: [
      { title: "Görev Listesi", url: "/tasks" },
      { title: "Yeni Görev", url: "/tasks/new" },
      { title: "Görev Analizi", url: "/tasks/analytics" },
    ]
  },
  {
    title: "Kullanıcı Yönetimi",
    icon: Users,
    subPages: [
      { title: "Kullanıcı Listesi", url: "/users" },
      { title: "Roller", url: "/users/roles" },
      { title: "İzinler", url: "/users/permissions" },
    ]
  },
  {
    title: "Analitik",
    icon: TrendingUp,
    subPages: [
      { title: "Genel Analitik", url: "/analytics" },
      { title: "Raporlar", url: "/analytics/reports" },
      { title: "Performans", url: "/analytics/performance" },
    ]
  },
]

// Yardım ve ayarlar öğeleri
export const supportItems: NavigationItem[] = [
  {
    title: "Ayarlar",
    icon: Settings,
    subPages: [
      { title: "Genel Ayarlar", url: "/settings" },
      { title: "Güvenlik", url: "/security" },
      { title: "Bildirimler", url: "/notifications" },
      { title: "Tema", url: "/theme" },
    ]
  },
  {
    title: "Yardım",
    icon: HelpCircle,
    subPages: [
      { title: "Yardım Merkezi", url: "/help" },
      { title: "İletişim", url: "/contact" },
      { title: "Klavye Kısayolları", url: "/shortcuts" },
      { title: "Geri Bildirim", url: "/feedback" },
    ]
  },
]

// Arama için tüm sayfaları düz liste halinde topla
export const getAllPages = () => {
  return [
    ...navigation.flatMap(item => 
      item.subPages.map(subPage => ({
        ...subPage,
        category: item.title,
        icon: item.icon
      }))
    ),
    ...supportItems.flatMap(item => 
      item.subPages.map(subPage => ({
        ...subPage,
        category: item.title,
        icon: item.icon
      }))
    )
  ]
}