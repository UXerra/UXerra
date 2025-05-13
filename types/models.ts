export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'USER' | 'ADMIN';
  stripeCustomerId?: string;
  subscription?: Subscription;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  status: string;
  plan: string;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: string;
  fields?: Record<string, unknown>;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedContent {
  id: string;
  userId: string;
  type: string;
  prompt: string;
  content: Record<string, unknown>;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface BrandingPackage {
  id: string;
  userId: string;
  name: string;
  industry: string;
  goal: string;
  description: string;
  targetAudience: string;
  style: string;
  colorPreference?: string;
  result: Record<string, unknown>;
  createdAt: Date;
}

export interface WebhookEvent {
  id: string;
  type: string;
  provider: string;
  payload: Record<string, unknown>;
  status: string;
  error?: string;
  createdAt: Date;
  processedAt?: Date;
}

export interface ApiKey {
  id: string;
  userId: string;
  key: string;
  name: string;
  permissions: string[];
  lastUsed?: Date;
  createdAt: Date;
  expiresAt?: Date;
}

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, unknown>;
  ip: string;
  userAgent: string;
  createdAt: Date;
} 