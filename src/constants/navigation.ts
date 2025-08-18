import { 
  LayoutDashboard, 
  Heart, 
  Coins, 
  GraduationCap, 
  MessageSquare, 
  Calendar,
  FolderTree,
  PieChart,
  Settings,
  Users,
  Database,
  FileText,
  BarChart3,
  MapPin,
  Building,
  Globe,
  Phone,
  Mail,
  CreditCard,
  Banknote,
  HandHeart,
  UserCheck,
  TrendingUp,
  Target,
  Activity,
  ClipboardList,
  HelpCircle,
  BookOpen,
  Shield,
  Bell,
  Archive,
  Filter,
  Search
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  title: string
  icon: LucideIcon
  url?: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  subPages: Array<{
    title: string
    url: string
    description?: string
    badge?: string
    isNew?: boolean
  }>
}

export interface SearchableItem {
  title: string
  description: string
  url: string
  icon?: LucideIcon
  badge?: string
  category: string
  parent?: string
}

export const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
    badge: "3",
    subPages: [
      { title: "Genel Bakış", url: "/", description: "Ana dashboard görünümü" },
      { title: "Analitik", url: "/analytics", description: "Detaylı analiz ve raporlar" },
      { title: "Performans", url: "/system/performance", description: "Sistem performans metrikleri" }
    ]
  },
  {
    title: "Yardım Yönetimi",
    icon: Heart,
    badge: "12",
    subPages: [
      { title: "Başvurular", url: "/aid/applications", description: "Yardım başvurularını yönet" },
      { title: "Yararlanıcılar", url: "/aid/beneficiaries", description: "Yararlanıcı kayıtları" },
      { title: "Yararlanıcı Detayı", url: "/aid/beneficiaries-detail", description: "Detaylı yararlanıcı bilgileri" },
      { title: "Raporlar", url: "/aid/reports", description: "Yardım raporları" },
      { title: "Nakit Kasası", url: "/aid/cash-vault", description: "Nakit yardım kasası" },
      { title: "Banka Emirleri", url: "/aid/bank-orders", description: "Banka havale emirleri" },
      { title: "Nakit İşlemler", url: "/aid/cash-operations", description: "Nakit yardım işlemleri" },
      { title: "Ayni İşlemler", url: "/aid/in-kind-operations", description: "Ayni yardım işlemleri" },
      { title: "Hizmet Takibi", url: "/aid/service-tracking", description: "Hizmet yardımı takibi" },
      { title: "Hastane Sevkleri", url: "/aid/hospital-referrals", description: "Sağlık yardımı sevkleri" },
      { title: "Parametreler", url: "/aid/parameters", description: "Yardım parametreleri" },
      { title: "Veri Kontrolü", url: "/aid/data-control", description: "Veri doğrulama" },
      { title: "Modül Bilgisi", url: "/aid/module-info", description: "Modül dokümantasyonu" }
    ]
  },
  {
    title: "Bağış Yönetimi",
    icon: Coins,
    subPages: [
      { title: "Bağışlar", url: "/donations", description: "Tüm bağış kayıtları" },
      { title: "Bağış Kasası", url: "/donations/vault", description: "Bağış kasa yönetimi" },
      { title: "Kurumsal", url: "/donations/institutions", description: "Kurumsal bağışçılar" },
      { title: "Nakit Bağışlar", url: "/donations/cash", description: "Nakit bağış kayıtları" },
      { title: "Banka Bağışları", url: "/donations/bank", description: "Banka transferi bağışları" },
      { title: "Kredi Kartı", url: "/donations/credit-card", description: "Kredi kartı bağışları" },
      { title: "Online Bağışlar", url: "/donations/online", description: "Online platform bağışları" },
      { title: "Bağış Numaraları", url: "/donations/numbers", description: "Bağış takip numaraları" },
      { title: "Finansman Tanımları", url: "/donations/funding-definitions", description: "Bağış kategorileri" },
      { title: "Kurban Dönemleri", url: "/donations/sacrifice-periods", description: "Kurban organizasyonu" },
      { title: "Kurban Hisseleri", url: "/donations/sacrifice-shares", description: "Kurban hisse yönetimi" },
      { title: "Ramazan Dönemleri", url: "/donations/ramadan-periods", description: "Ramazan kampanyaları" },
      { title: "Kumbara Takibi", url: "/donations/piggy-bank", description: "Kumbara bağış takibi" },
      { title: "Toplu Provizyon", url: "/donations/bulk-provisioning", description: "Toplu bağış provizyon" },
      { title: "Kurumsal Bağışlar", url: "/donations/corporate", description: "Kurumsal bağış yönetimi" }
    ]
  },
  {
    title: "Burs Yönetimi",
    icon: GraduationCap,
    badge: "Yeni",
    badgeVariant: "secondary" as const,
    subPages: [
      { title: "Burs Programı", href: "/scholarship", description: "Ana burs programı" },
      { title: "Öğrenci Takibi", href: "/scholarship/students", description: "Öğrenci kayıt ve takibi" },
      { title: "Burs Raporları", href: "/scholarship/reports", description: "Burs analiz raporları" },
      { title: "Görsel Yönetim", href: "/scholarship/visual", description: "Öğrenci fotoğraf yönetimi" },
      { title: "Burs Tanımları", href: "/scholarship/definitions", description: "Burs türü tanımları" },
      { title: "Takip Kategorileri", href: "/scholarship/categories", description: "Öğrenci kategorileri" },
      { title: "Öğrenci Formu", href: "/scholarship/form", description: "Öğrenci başvuru formu" },
      { title: "Öğrenci Mektupları", href: "/scholarship/letters", description: "Mektup yazışmaları" },
      { title: "Burs Kampanyaları", href: "/scholarship/campaigns", description: "Burs kampanya yönetimi" },
      { title: "Okullar", href: "/scholarship/schools", description: "Okul kayıtları" },
      { title: "Form Tanımları", href: "/scholarship/form-definitions", description: "Dinamik form yapısı" },
      { title: "Fiyat Tanımları", href: "/scholarship/prices", description: "Burs miktarları" },
      { title: "Adres Etiketleri", href: "/scholarship/address-labels", description: "Posta etiketi sistemi" },
      { title: "Veri Kontrolü", href: "/scholarship/data-control", description: "Öğrenci veri doğrulama" },
      { title: "Modül Bilgisi", href: "/scholarship/module-info", description: "Burs modülü dokümantasyonu" }
    ]
  },
  {
    title: "Mesajlaşma",
    icon: MessageSquare,
    subPages: [
      { title: "Mesajlar", url: "/messages", description: "Tüm mesajlaşma" },
      { title: "Toplu Gönderim", url: "/messages/bulk-send", description: "Toplu SMS/Email gönderimi" },
      { title: "Gelişmiş Toplu Gönderim", url: "/messages/bulk-send-enhanced", description: "Gelişmiş gönderim seçenekleri", isNew: true },
      { title: "Gruplar", url: "/messages/groups", description: "Mesaj grupları yönetimi" },
      { title: "Şablonlar", url: "/messages/templates", description: "Mesaj şablonları" },
      { title: "SMS Teslimatları", url: "/messages/sms-deliveries", description: "SMS teslimat raporları" },
      { title: "Email Teslimatları", url: "/messages/email-deliveries", description: "Email teslimat raporları" },
      { title: "Analitik", url: "/messages/analytics", description: "Mesajlaşma analitikleri" },
      { title: "Modül Bilgisi", url: "/messages/module-info", description: "Mesajlaşma modülü bilgisi" }
    ]
  },
  {
    title: "Fon Yönetimi",
    icon: PieChart,
    subPages: [
      { title: "Fon Hareketleri", url: "/fund/movements", description: "Tüm fon hareketleri" },
      { title: "Kapsamlı Rapor", url: "/fund/complete-report", description: "Detaylı fon raporu" },
      { title: "Fon Bölgeleri", url: "/fund/regions", description: "Bölgesel fon dağılımı" },
      { title: "Çalışma Alanları", url: "/fund/work-areas", description: "Fon kullanım alanları" },
      { title: "Fon Tanımları", url: "/fund/definitions", description: "Fon türü tanımları" },
      { title: "Faaliyet Tanımları", url: "/fund/activity-definitions", description: "Faaliyet kategorileri" },
      { title: "Kaynak/Gider", url: "/fund/sources-expenses", description: "Gelir gider analizi" },
      { title: "Yardım Kategorileri", url: "/fund/aid-categories", description: "Yardım kategori tanımları" }
    ]
  },
  {
    title: "Sistem Yönetimi",
    icon: Settings,
    subPages: [
      { title: "Güvenlik Ayarları", url: "/security/settings", description: "Sistem güvenlik ayarları" },
      { title: "Uyarı Mesajları", url: "/system/warning-messages", description: "Sistem uyarı yönetimi" },
      { title: "Yapısal Kontroller", url: "/system/structural-controls", description: "Veri bütünlüğü kontrolleri" },
      { title: "Yerel IP'ler", url: "/system/local-ips", description: "Yerel ağ IP yönetimi" },
      { title: "IP Engelleme", url: "/system/ip-blocking", description: "IP güvenlik kuralları" },
      { title: "Kullanıcı Yönetimi", url: "/system/user-management", description: "Sistem kullanıcı yönetimi" },
      { title: "Performans", url: "/system/performance", description: "Sistem performans izleme" }
    ]
  },
  {
    title: "Tanımlamalar",
    icon: Database,
    subPages: [
      { title: "Tanımlamalar", url: "/definitions", description: "Genel sistem tanımları" },
      { title: "Birim Rolleri", url: "/definitions/unit-roles", description: "Organizasyon birim rolleri" },
      { title: "Birimler", url: "/definitions/units", description: "Organizasyon birimleri" },
      { title: "Kullanıcı Hesapları", url: "/definitions/user-accounts", description: "Kullanıcı hesap yönetimi" },
      { title: "Yetki Grupları", url: "/definitions/permission-groups", description: "Kullanıcı yetki grupları" },
      { title: "Binalar", url: "/definitions/buildings", description: "Bina ve lokasyon tanımları" },
      { title: "Dahili Hatlar", url: "/definitions/internal-lines", description: "İç telefon hatları" },
      { title: "Süreç Akı��ları", url: "/definitions/process-flows", description: "Süreç yönetimi" },
      { title: "Pasaport Formatları", url: "/definitions/passport-formats", description: "Pasaport veri formatları" },
      { title: "Ülke/Şehirler", url: "/definitions/countries-cities", description: "Coğrafi tanımlar" },
      { title: "Kurum Türleri", url: "/definitions/institution-types", description: "Kurum kategori tanımları" },
      { title: "Kurum Durumları", url: "/definitions/institution-status", description: "Kurum durum tanımları" },
      { title: "Bağış Yöntemleri", url: "/definitions/donation-methods", description: "Bağış yöntem tanımları" },
      { title: "Teslimat Türleri", url: "/definitions/delivery-types", description: "Teslimat yöntem tanımları" },
      { title: "Toplantı Talepleri", url: "/definitions/meeting-requests", description: "Toplantı türü tanımları" },
      { title: "GSM Kodları", url: "/definitions/gsm-codes", description: "GSM operatör kodları" },
      { title: "Arayüz Dilleri", url: "/definitions/interface-languages", description: "Çoklu dil desteği" },
      { title: "Çeviriler", url: "/definitions/translations", description: "Dil çeviri yönetimi" },
      { title: "Genel Ayarlar", url: "/definitions/general-settings", description: "Sistem genel ayarları" },
      { title: "Modül Bilgisi", url: "/definitions/module-info", description: "Tanımlamalar modül bilgisi" }
    ]
  },
  {
    title: "Toplantılar",
    icon: Calendar,
    url: "/meetings",
    subPages: [
      { title: "Toplantı Takvimi", url: "/meetings", description: "Toplantı programı" },
      { title: "Yeni Toplantı", url: "/meetings/new", description: "Toplantı planla" },
      { title: "Geçmiş Toplantılar", url: "/meetings/history", description: "Toplantı arşivi" }
    ]
  },
  {
    title: "İç Mesajlar",
    icon: MessageSquare,
    url: "/internal-messages",
    subPages: [
      { title: "Gelen Kutusu", url: "/internal-messages", description: "Gelen iç mesajlar" },
      { title: "Gönderilen", url: "/internal-messages/sent", description: "Gönderilen mesajlar" },
      { title: "Yeni Mesaj", url: "/internal-messages/new", description: "Yeni iç mesaj" }
    ]
  },
  {
    title: "Görevler",
    icon: ClipboardList,
    url: "/tasks",
    subPages: [
      { title: "Görev Listesi", url: "/tasks", description: "Aktif görevler" },
      { title: "Tamamlanan", url: "/tasks/completed", description: "Tamamlanan görevler" },
      { title: "Yeni Görev", url: "/tasks/new", description: "Yeni görev oluştur" }
    ]
  }
]

// Support navigation items
export const supportNavigation = [
  {
    title: "Yardım",
    icon: HelpCircle,
    href: "/help",
    description: "Kullanım kılavuzu ve SSS",
    subPages: []
  },
  {
    title: "Dokümantasyon",
    icon: BookOpen,
    href: "/docs",
    description: "Teknik dokümantasyon",
    subPages: []
  },
  {
    title: "İletişim",
    icon: Phone,
    href: "/contact",
    description: "Destek ekibi ile iletişim",
    subPages: []
  }
]

// Quick access items for search
export const quickAccessItems = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard, category: 'Ana Sayfa' },
  { title: 'Yeni Başvuru', href: '/aid/applications', icon: Heart, category: 'Hızlı İşlem' },
  { title: 'Bağış Kaydı', href: '/donations/cash', icon: Coins, category: 'Hızlı İşlem' },
  { title: 'Toplu Mesaj', href: '/messages/bulk-send', icon: MessageSquare, category: 'Hızlı İşlem' },
  { title: 'Yeni Toplantı', href: '/meetings/new', icon: Calendar, category: 'Hızlı İşlem' },
  { title: 'Raporlar', href: '/aid/reports', icon: FileText, category: 'Raporlama' },
  { title: 'Analitik', href: '/analytics', icon: BarChart3, category: 'Raporlama' },
  { title: 'Performans', href: '/system/performance', icon: Activity, category: 'Sistem' },
  { title: 'Ayarlar', href: '/settings', icon: Settings, category: 'Sistem' }
]

// Export alias for backward compatibility
export const supportItems = supportNavigation
