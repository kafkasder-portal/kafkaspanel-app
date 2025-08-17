export interface User {
  name: string
  email: string
  avatar?: string
  initials: string
}

export interface Project {
  id: string
  name: string
  status: 'Devam Ediyor' | 'İnceleme' | 'Planlama' | 'Tamamlandı'
  priority: 'Yüksek' | 'Orta' | 'Düşük'
  dueDate: string
  progress: number
  assignedTo?: User[]
}

export interface Activity {
  id: string
  user: string
  action: string
  time: string
  type: 'update' | 'create' | 'complete' | 'schedule'
}

export interface Stat {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: string
}

export interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
}