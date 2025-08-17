import { createClient } from '@supabase/supabase-js'

// Global setup for Jest tests
export default async function globalSetup() {
  console.log('🚀 Setting up test environment...')
  
  // Set test environment variables
  process.env.NODE_ENV = 'test'
  process.env.SUPABASE_URL = 'https://test.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
  process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing'
  process.env.PORT = '3001'
  process.env.CORS_ORIGIN = 'http://localhost:5173'
  
  // Initialize test database if needed
  try {
    // You can add database initialization logic here
    // For example, creating test tables, seeding test data, etc.
    console.log('✅ Test environment setup completed')
  } catch (error) {
    console.error('❌ Failed to setup test environment:', error)
    throw error
  }
}