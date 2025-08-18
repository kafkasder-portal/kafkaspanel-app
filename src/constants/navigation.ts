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
  href?: string
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  subPages: Array<{
    title: string
    href?: string
    description?: string
    badge?: string
    isNew?: boolean
  }>
}

export interface SearchableItem {
  title: string
  description: string
  href: string
  icon?: LucideIcon
  badge?: string
  category: string
  parent?: string
}

export const navigation: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    badge: "3",
    subPages: [
      { title: "Genel Bakış", href: "/", description: "Ana dashboard görünümü" },
      { title: "Analitik", href: "/analytics", description: "Detaylı analiz ve raporlar" },
      { title: "Performans", href: "/system/performance", description: "Sistem performans metrikleri" }
    ]
  },
  {
    title: "Yardım Yönetimi",
    icon: Heart,
    badge: "12",
    subPages: [
      { title: "Başvurular", href: "/aid/applications", description: "Yardım başvurularını yönet" },
      { title: "Yararlanıcılar", href: "/aid/beneficiaries", description: "Yararlanıcı kayıtları" },
      { title: "Yararlanıcı Detayı", href: "/aid/beneficiaries-detail", description: "Detaylı yararlanıcı bilgileri" },
      { title: "Raporlar", href: "/aid/reports", description: "Yardım raporları" },
      { title: "Nakit Kasası", href: "/aid/cash-vault", description: "Nakit yardım kasası" },
      { title: "Banka Emirleri", href: "/aid/bank-orders", description: "Banka havale emirleri" },
      { title: "Nakit İşlemler", href: "/aid/cash-operations", description: "Nakit yardım işlemleri" },
      { title: "Ayni İşlemler", href: "/aid/in-kind-operations", description: "Ayni yardım işlemleri" },
      { title: "Hizmet Takibi", href: "/aid/service-tracking", description: "Hizmet yardımı takibi" },
      { title: "Hastane Sevkleri", href: "/aid/hospital-referrals", description: "Sağlık yardımı sevkleri" },
      { title: "Parametreler", href: "/aid/parameters", description: "Yardım parametreleri" },
      { title: "Veri Kontrolü", href: "/aid/data-control", description: "Veri doğrulama" },
      { title: "Modül Bilgisi", href: "/aid/module-info", description: "Modül dokümantasyonu" }
    ]
  },
  {
    title: "Bağış Yönetimi",
    icon: Coins,
    subPages: [
      { title: "Bağışlar", href: "/donations", description: "Tüm bağış kayıtları" },
      { title: "Bağış Kasası", href: "/donations/vault", description: "Bağış kasa yönetimi" },
      { title: "Kurumsal", href: "/donations/institutions", description: "Kurumsal bağışçılar" },
      { title: "Nakit Bağışlar", href: "/donations/cash", description: "Nakit bağış kayıtları" },
      { title: "Banka Bağışları", href: "/donations/bank", description: "Banka transferi bağışları" },
      { title: "Kredi Kartı", href: "/donations/credit-card", description: "Kredi kartı bağışları" },
      { title: "Online Bağışlar", href: "/donations/online", description: "Online platform bağışları" },
      { title: "Bağış Numaraları", href: "/donations/numbers", description: "Bağış takip numaraları" },
      { title: "Finansman Tanımları", href: "/donations/funding-definitions", description: "Bağış kategorileri" },
      { title: "Kurban Dönemleri", href: "/donations/sacrifice-periods", description: "Kurban organizasyonu" },
      { title: "Kurban Hisseleri", href: "/donations/sacrifice-shares", description: "Kurban hisse yönetimi" },
      { title: "Ramazan Dönemleri", href: "/donations/ramadan-periods", description: "Ramazan kampanyaları" },
      { title: "Kumbara Takibi", href: "/donations/piggy-bank", description: "Kumbara bağış takibi" },
      { title: "Toplu Provizyon", href: "/donations/bulk-provisioning", description: "Toplu bağış provizyon" },
      { title: "Kurumsal Bağışlar", href: "/donations/corporate", description: "Kurumsal bağış yönetimi" }
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
      { title: "Mesajlar", href: "/messages", description: "Tüm mesajlaşma" },
      { title: "Toplu Gönderim", href: "/messages/bulk-send", description: "Toplu SMS/Email gönderimi" },
      { title: "Gelişmiş Toplu Gönderim", href: "/messages/bulk-send-enhanced", description: "Gelişmiş gönderim seçenekleri", isNew: true },
      { title: "Gruplar", href: "/messages/groups", description: "Mesaj grupları yönetimi" },
      { title: "Şablonlar", href: "/messages/templates", description: "Mesaj şablonları" },
      { title: "SMS Teslimatları", href: "/messages/sms-deliveries", description: "SMS teslimat raporları" },
      { title: "Email Teslimatları", href: "/messages/email-deliveries", description: "Email teslimat raporları" },
      { title: "Analitik", href: "/messages/analytics", description: "Mesajlaşma analitikleri" },
      { title: "Modül Bilgisi", href: "/messages/module-info", description: "Mesajlaşma modülü bilgisi" }
    ]
  },
  {
    title: "Fon Yönetimi",
    icon: PieChart,
    subPages: [
      { title: "Fon Hareketleri", href: "/fund/movements", description: "Tüm fon hareketleri" },
      { title: "Kapsamlı Rapor", href: "/fund/complete-report", description: "Detaylı fon raporu" },
      { title: "Fon Bölgeleri", href: "/fund/regions", description: "Bölgesel fon dağılımı" },
      { title: "Çalışma Alanları", href: "/fund/work-areas", description: "Fon kullanım alanları" },
      { title: "Fon Tanımları", href: "/fund/definitions", description: "Fon türü tanımları" },
      { title: "Faaliyet Tanımları", href: "/fund/activities", description: "Faaliyet kategorileri" },
      { title: "Kaynak/Gider", href: "/fund/sources-expenses", description: "Gelir gider analizi" },
      { title: "Yardım Kategorileri", href: "/fund/aid-categories", description: "Yardım kategori tanımları" }
    ]
  },
  {
    title: "Sistem Yönetimi",
    icon: Settings,
    subPages: [
      { title: "Güvenlik Ayarları", href: "/security/settings", description: "Sistem güvenlik ayarları" },
      { title: "Uyarı Mesajları", href: "/system/warnings", description: "Sistem uyarı yönetimi" },
      { title: "Yapısal Kontroller", href: "/system/structural", description: "Veri bütünlüğü kontrolleri" },
      { title: "Yerel IP'ler", href: "/system/local-ips", description: "Yerel ağ IP yönetimi" },
      { title: "IP Engelleme", href: "/system/ip-blocking", description: "IP güvenlik kuralları" },
      { title: "Kullanıcı Yönetimi", href: "/system/users", description: "Sistem kullanıcı yönetimi" },
      { title: "Performans", href: "/system/performance", description: "Sistem performans izleme" }
    ]
  },
  {
    title: "Tanımlamalar",
    icon: Database,
    subPages: [
      { title: "Tanımlamalar", href: "/definitions", description: "Genel sistem tanımları" },
      { title: "Birim Rolleri", href: "/definitions/unit-roles", description: "Organizasyon birim rolleri" },
      { title: "Birimler", href: "/definitions/units", description: "Organizasyon birimleri" },
      { title: "Kullanıcı Hesapları", href: "/definitions/user-accounts", description: "Kullanıcı hesap yönetimi" },
      { title: "Yetki Grupları", href: "/definitions/permission-groups", description: "Kullanıcı yetki grupları" },
      { title: "Binalar", href: "/definitions/buildings", description: "Bina ve lokasyon tanımları" },
      { title: "Dahili Hatlar", href: "/definitions/internal-lines", description: "İç telefon hatları" },
      { title: "Süreç Akışları", href: "/definitions/process-flows", description: "İş süreçleri" },
      { title: "Pasaport Formatları", href: "/definitions/passport-formats", description: "Pasaport veri formatları" },
      { title: "Ülke/Şehirler", href: "/definitions/countries-cities", description: "Coğrafi tanımlar" },
      { title: "Kurum Türleri", href: "/definitions/institution-types", description: "Kurum kategori tanımları" },
      { title: "Kurum Durumları", href: "/definitions/institution-status", description: "Kurum durum tanımları" },
      { title: "Bağış Yöntemleri", href: "/definitions/donation-methods", description: "Bağış yöntem tanımları" },
      { title: "Teslimat Türleri", href: "/definitions/delivery-types", description: "Teslimat yöntem tanımları" },
      { title: "Toplantı Talepleri", href: "/definitions/meeting-requests", description: "Toplantı türü tanımları" },
      { title: "GSM Kodları", href: "/definitions/gsm-codes", description: "GSM operatör kodları" },
      { title: "Arayüz Dilleri", href: "/definitions/languages", description: "Çoklu dil desteği" },
      { title: "Çeviriler", href: "/definitions/translations", description: "Dil çeviri yönetimi" },
      { title: "Genel Ayarlar", href: "/definitions/general", description: "Sistem genel ayarları" },
      { title: "Modül Bilgisi", href: "/definitions/module-info", description: "Tanımlamalar modül bilgisi" }
    ]
  },
  {
    title: "Toplantılar",
    icon: Calendar,
    href: "/meetings",
    subPages: [
      { title: "Toplantı Takvimi", href: "/meetings", description: "Toplantı programı" },
      { title: "Yeni Toplantı", href: "/meetings/new", description: "Toplantı planla" },
      { title: "Geçmiş Toplantılar", href: "/meetings/history", description: "Toplantı arşivi" }
    ]
  },
  {
    title: "İç Mesajlar",
    icon: MessageSquare,
    href: "/internal-messages",
    subPages: [
      { title: "Gelen Kutusu", href: "/internal-messages", description: "Gelen iç mesajlar" },
      { title: "Gönderilen", href: "/internal-messages/sent", description: "Gönderilen mesajlar" },
      { title: "Yeni Mesaj", href: "/internal-messages/new", description: "Yeni iç mesaj" }
    ]
  },
  {
    title: "Görevler",
    icon: ClipboardList,
    href: "/tasks",
    subPages: [
      { title: "Görev Listesi", href: "/tasks", description: "Aktif görevler" },
      { title: "Tamamlanan", href: "/tasks/completed", description: "Tamamlanan görevler" },
      { title: "Yeni Görev", href: "/tasks/new", description: "Yeni görev oluştur" }
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
