import { z } from 'zod';
import {
  userSchema,
  createUserSchema,
  updateUserSchema,
  subscriptionSchema,
  newsletterSchema,
  brandingSchema,
  apiKeySchema,
  auditLogSchema,
} from './schema.js';

// User types
export type User = z.infer<typeof userSchema>;

export type Subscription = z.infer<typeof subscriptionSchema>;

// Newsletter types
export type Newsletter = z.infer<typeof newsletterSchema>;

// Branding types
export type Branding = z.infer<typeof brandingSchema>;

// API key types
export type ApiKey = z.infer<typeof apiKeySchema>;

// Audit log types
export type AuditLog = z.infer<typeof auditLogSchema>;

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface AuthToken {
  token: string;
  expiresIn: number;
}

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Common types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Newsletter types
export type NewsletterSubscriber = z.infer<typeof newsletterSchema>;
export type SubscriberStatus = NewsletterSubscriber['status'];

// Branding types
export type BrandingPackage = z.infer<typeof brandingSchema>;

// Common types
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}; 