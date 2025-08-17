import { create } from 'zustand'

type PaginationState = {
  page: number
  pageSize: number
  setPage: (page: number) => void
}

export const usePagination = create<PaginationState>((set) => ({
  page: 1,
  pageSize: 20,
  setPage: (page) => set({ page }),
}))

// Eski sidebar state kaldırıldı - yeni temiz sidebar kullanılıyor


