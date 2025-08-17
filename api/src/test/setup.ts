import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals'
import { createClient } from '@supabase/supabase-js'

// Mock environment variables for testing
process.env.SUPABASE_URL = 'https://test.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'
process.env.SUPABASE_ANON_KEY = 'test-anon-key'
process.env.JWT_SECRET = 'test-jwt-secret'
process.env.NODE_ENV = 'test'
process.env.PORT = '3001'
process.env.CORS_ORIGIN = 'http://localhost:5173'

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    admin: {
      createUser: jest.fn(),
      deleteUser: jest.fn(),
      updateUserById: jest.fn(),
      getUserById: jest.fn(),
      listUsers: jest.fn(),
    },
    getUser: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    neq: jest.fn().mockReturnThis(),
    gt: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lt: jest.fn().mockReturnThis(),
    lte: jest.fn().mockReturnThis(),
    like: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
    in: jest.fn().mockReturnThis(),
    contains: jest.fn().mockReturnThis(),
    containedBy: jest.fn().mockReturnThis(),
    rangeGt: jest.fn().mockReturnThis(),
    rangeGte: jest.fn().mockReturnThis(),
    rangeLt: jest.fn().mockReturnThis(),
    rangeLte: jest.fn().mockReturnThis(),
    rangeAdjacent: jest.fn().mockReturnThis(),
    overlaps: jest.fn().mockReturnThis(),
    textSearch: jest.fn().mockReturnThis(),
    match: jest.fn().mockReturnThis(),
    not: jest.fn().mockReturnThis(),
    or: jest.fn().mockReturnThis(),
    filter: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    abortSignal: jest.fn().mockReturnThis(),
    single: jest.fn(),
    maybeSingle: jest.fn(),
    csv: jest.fn(),
    geojson: jest.fn(),
    explain: jest.fn(),
    rollback: jest.fn(),
    returns: jest.fn().mockReturnThis(),
  })),
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(),
      download: jest.fn(),
      remove: jest.fn(),
      list: jest.fn(),
      createSignedUrl: jest.fn(),
      createSignedUrls: jest.fn(),
      getPublicUrl: jest.fn(),
      move: jest.fn(),
      copy: jest.fn(),
    })),
  },
  rpc: jest.fn(),
}

// Mock Supabase module
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}))

// Mock Express modules
jest.mock('express', () => {
  const mockExpress = {
    Router: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
    })),
    json: jest.fn(),
    urlencoded: jest.fn(),
    static: jest.fn(),
  }
  return Object.assign(jest.fn(() => ({
    use: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    listen: jest.fn(),
    set: jest.fn(),
  })), mockExpress)
})

// Mock CORS
jest.mock('cors', () => jest.fn(() => (req: any, res: any, next: any) => next()))

// Mock Helmet
jest.mock('helmet', () => jest.fn(() => (req: any, res: any, next: any) => next()))

// Mock Morgan
jest.mock('morgan', () => jest.fn(() => (req: any, res: any, next: any) => next()))

// Mock compression
jest.mock('compression', () => jest.fn(() => (req: any, res: any, next: any) => next()))

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
  decode: jest.fn(),
}))

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn(),
}))

// Mock multer
jest.mock('multer', () => {
  const multer: any = jest.fn(() => ({
    single: jest.fn(() => (req: any, res: any, next: any) => {
      req.file = {
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('test'),
      }
      next()
    }),
    array: jest.fn(() => (req: any, res: any, next: any) => {
      req.files = [{
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 1024,
        buffer: Buffer.from('test'),
      }]
      next()
    }),
  }))
  multer.memoryStorage = jest.fn()
  return multer
})

// Global test setup
beforeAll(async () => {
  // Setup test database or any global resources
  console.log('Setting up test environment...')
})

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks()
})

afterEach(() => {
  // Clean up after each test
  jest.resetAllMocks()
})

afterAll(async () => {
  // Cleanup test database or any global resources
  console.log('Tearing down test environment...')
})

// Test utilities
export const createMockRequest = (overrides: any = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: null,
  file: null,
  files: null,
  ...overrides,
})

export const createMockResponse = () => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    render: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis(),
  }
  return res
}

export const createMockNext = () => jest.fn()

export const createMockUser = (overrides: any = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  full_name: 'Test User',
  role: 'user',
  is_active: true,
  created_at: new Date().toISOString(),
  ...overrides,
})

export const createMockBeneficiary = (overrides: any = {}) => ({
  id: 'test-beneficiary-id',
  full_name: 'Test Beneficiary',
  identity_number: '12345678901',
  phone: '+90 555 123 4567',
  email: 'beneficiary@example.com',
  address: 'Test Address',
  city: 'Test City',
  status: 'active',
  created_at: new Date().toISOString(),
  ...overrides,
})

export const createMockApplication = (overrides: any = {}) => ({
  id: 'test-application-id',
  beneficiary_id: 'test-beneficiary-id',
  application_type: 'aid_request',
  title: 'Test Application',
  description: 'Test Description',
  status: 'pending',
  priority: 'medium',
  created_at: new Date().toISOString(),
  ...overrides,
})

export const createMockPayment = (overrides: any = {}) => ({
  id: 'test-payment-id',
  aid_record_id: 'test-aid-record-id',
  amount: 1000,
  payment_method: 'bank_transfer',
  status: 'pending',
  reference_number: 'REF123456',
  created_at: new Date().toISOString(),
  ...overrides,
})

export const createMockDocument = (overrides: any = {}) => ({
  id: 'test-document-id',
  title: 'Test Document',
  description: 'Test Description',
  file_name: 'test.pdf',
  file_path: '/documents/test.pdf',
  file_size: 1024,
  file_type: 'application/pdf',
  document_type: 'identity',
  is_public: false,
  is_archived: false,
  uploaded_by: 'test-user-id',
  created_at: new Date().toISOString(),
  ...overrides,
})

// Export the mock client for use in tests
export { mockSupabaseClient }