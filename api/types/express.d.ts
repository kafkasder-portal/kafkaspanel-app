// Custom AuthUser interface for authenticated requests
interface AuthUser {
  id: string
  email: string
  role: string
  permissions: string[]
  organizationId?: string
  profile: any
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
