import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { config } from '../config';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate random token
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

// Generate API key
export function generateApiKey(): string {
  return `ux_${crypto.randomBytes(32).toString('hex')}`;
}

// Generate JWT token
export function generateJwtToken(payload: any): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 60 * 60 * 24 * 7; // 7 days

  const finalPayload = {
    ...payload,
    iat: now,
    exp,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const encodedPayload = Buffer.from(JSON.stringify(finalPayload)).toString(
    'base64url'
  );

  const signature = crypto
    .createHmac('sha256', config.jwt.secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify JWT token
export function verifyJwtToken(token: string): any {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const expectedSignature = crypto
    .createHmac('sha256', config.jwt.secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(
    Buffer.from(encodedPayload, 'base64url').toString()
  );

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    throw new Error('Token expired');
  }

  return payload;
}

// Sanitize object
export function sanitizeObject<T extends object>(
  obj: T,
  allowedFields: (keyof T)[]
): Partial<T> {
  return Object.keys(obj).reduce((result, key) => {
    if (allowedFields.includes(key as keyof T)) {
      result[key as keyof T] = obj[key as keyof T];
    }
    return result;
  }, {} as Partial<T>);
}

// Sanitize user
export function sanitizeUser(user: any): any {
  const allowedFields = [
    'id',
    'email',
    'name',
    'role',
    'createdAt',
    'updatedAt',
  ];
  return sanitizeObject(user, allowedFields);
}

// Sanitize subscription
export function sanitizeSubscription(subscription: any): any {
  const allowedFields = [
    'id',
    'userId',
    'status',
    'plan',
    'currentPeriodEnd',
    'createdAt',
    'updatedAt',
  ];
  return sanitizeObject(subscription, allowedFields);
}

// Sanitize content
export function sanitizeContent(content: any): any {
  const allowedFields = [
    'id',
    'userId',
    'type',
    'content',
    'metadata',
    'createdAt',
    'updatedAt',
  ];
  return sanitizeObject(content, allowedFields);
}

// Sanitize branding package
export function sanitizeBrandingPackage(package: any): any {
  const allowedFields = [
    'id',
    'userId',
    'name',
    'industry',
    'goal',
    'description',
    'targetAudience',
    'style',
    'colorPreference',
    'result',
    'createdAt',
    'updatedAt',
  ];
  return sanitizeObject(package, allowedFields);
}

// Sanitize API key
export function sanitizeApiKey(apiKey: any): any {
  const allowedFields = [
    'id',
    'userId',
    'name',
    'permissions',
    'lastUsed',
    'createdAt',
    'expiresAt',
  ];
  return sanitizeObject(apiKey, allowedFields);
}

// Sanitize audit log
export function sanitizeAuditLog(log: any): any {
  const allowedFields = [
    'id',
    'userId',
    'action',
    'resource',
    'resourceId',
    'details',
    'ip',
    'userAgent',
    'createdAt',
  ];
  return sanitizeObject(log, allowedFields);
} 