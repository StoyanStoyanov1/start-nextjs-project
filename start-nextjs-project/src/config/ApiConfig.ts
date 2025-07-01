/**
 * API endpoints configuration
 */
export const ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  auth: {
    // Authentication endpoints
    register: '/auth/sign-up',
    login: '/auth/sign-in',
    profile: '/auth/me',
    logout: '/auth/logout',
    
    // Google OAuth endpoints
    googleAuthorize: '/auth/google/authorize',
    googleCallback: '/auth/google/callback',
    
    // Email verification endpoints
    requestVerifyToken: '/auth/request-verify-token',
    verifyToken: '/auth/verify',
  },
  user: {
    // User profile endpoints
    profile: '/user/profile',
    updateProfile: '/user/profile',
  }
} as const;

/**
 * Type for API endpoints
 */
export type ApiEndpoints = typeof ApiConfig;