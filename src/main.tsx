import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
// Eski CSS dosyaları kaldırıldı - yeni temiz tema kullanılıyor
const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

// Initialize PWA Manager on app start
console.log('🚀 PWA Manager başlatılıyor...')
// PWA Manager singleton pattern ile otomatik başlatılır

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
