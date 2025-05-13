// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    PROFILE: '/api/auth/profile',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/users/profile',
  },
  BRANDING: {
    BASE: '/api/branding',
    GENERATE: '/api/branding/generate',
  },
  NEWSLETTER: {
    BASE: '/api/newsletter',
    SUBSCRIBE: '/api/newsletter/subscribe',
    UNSUBSCRIBE: '/api/newsletter/unsubscribe',
  },
  API_KEYS: {
    BASE: '/api/api-keys',
  },
} as const;

// User roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: 'FREE',
  PRO: 'PRO',
  AGENCY: 'AGENCY',
} as const;

// Subscription statuses
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CANCELLED: 'CANCELLED',
} as const;

// Newsletter subscriber statuses
export const SUBSCRIBER_STATUSES = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// API key permissions
export const API_KEY_PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
} as const;

// JWT token expiration times (in seconds)
export const JWT_EXPIRATION = {
  ACCESS: '7d',
  REFRESH: '30d',
} as const;

// Rate limiting
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX: 100, // 100 requests per window
} as const;

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
} as const;

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const; 