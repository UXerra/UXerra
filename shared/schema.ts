import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['USER', 'ADMIN']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

// Subscription schema
export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELLED']),
  plan: z.string(),
  currentPeriodEnd: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Newsletter schema
export const newsletterSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  fields: z.record(z.any()).optional(),
  groups: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Branding schema
export const brandingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  industry: z.string(),
  goal: z.string(),
  description: z.string(),
  targetAudience: z.string(),
  style: z.string(),
  colorPreference: z.string().optional(),
  result: z.record(z.any()),
  createdAt: z.date(),
});

// API Key schema
export const apiKeySchema = z.object({
  id: z.string(),
  userId: z.string(),
  key: z.string(),
  name: z.string(),
  permissions: z.array(z.string()),
  lastUsed: z.date().optional(),
  createdAt: z.date(),
  expiresAt: z.date().optional(),
});

// Audit Log schema
export const auditLogSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  details: z.record(z.any()),
  ip: z.string(),
  userAgent: z.string(),
  createdAt: z.date(),
});
