import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@ui': resolve(__dirname, './src/components/ui'),
      '@lib': resolve(__dirname, './src/lib'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@types': resolve(__dirname, './src/types'),
      '@pages': resolve(__dirname, './src/pages'),
      '@store': resolve(__dirname, './src/store'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@services': resolve(__dirname, './src/services'),
      '@constants': resolve(__dirname, './src/constants'),
      '@validators': resolve(__dirname, './src/validators'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // 2MB limit - for large vendor chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-label', '@radix-ui/react-progress', '@radix-ui/react-scroll-area', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-tabs'],
          'chart-vendor': ['recharts', 'leaflet', 'react-leaflet'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'state-vendor': ['zustand', '@tanstack/react-query'],
          'utils-vendor': ['date-fns', 'clsx', 'class-variance-authority', 'tailwind-merge'],
          'ai-vendor': ['@zxing/library', 'tesseract.js'],
          'file-vendor': ['file-saver', 'jspdf', 'jspdf-autotable', 'xlsx'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'framer-vendor': ['framer-motion'],
          
          // Feature chunks - specific files only
          'auth': ['@/store/auth', '@/hooks/useAuth', '@/components/ProtectedRoute'],
          'dashboard': ['@/pages/dashboard/Index'],
          'donations': ['@/pages/donations/List', '@/components/DonationCard', '@/components/DonationTracker'],
          'aid': ['@/pages/aid/Index', '@/components/ProvisionAnalytics'],
          'messages': ['@/pages/messages/Index', '@/components/Chat/ChatContainer'],
          'meetings': ['@/pages/meetings/Index'],
          'tasks': ['@/pages/tasks/Index'],
          'scholarship': ['@/pages/scholarship/Index'],
          'fund': ['@/pages/fund/FundMovements', '@/components/FundCard'],
          'system': ['@/pages/system/Performance'],
          'definitions': ['@/pages/definitions/Buildings'],
        }
      }
    },
    // Performance optimizations
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
