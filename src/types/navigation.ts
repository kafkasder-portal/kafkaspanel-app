export interface NavigationItem {
  id: string;
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  children?: NavigationItem[];
  permissions?: string[];
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
  defaultExpanded?: boolean;
}

// Eski sidebar tipleri kaldırıldı - yeni temiz sidebar kullanılıyor