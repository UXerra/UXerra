import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Configuration schema
const configSchema = z.object({
  env: z.enum(['development', 'production', 'test']).default('development'),
  port: z.string().default('4001'),
  appUrl: z.string().default('http://localhost:3013'),
  apiUrl: z.string().default('http://localhost:4001'),
  database: z.object({
    url: z.string().min(1),
  }),
  jwt: z.object({
    secret: z.string().min(32),
    expiresIn: z.string().default('7d'),
  }),
  stripe: z.object({
    secretKey: z.string().min(1),
  }),
  openai: z.object({
    apiKey: z.string().min(1),
  }),
  mailerlite: z.object({
    apiKey: z.string().min(1),
    groupId: z.string().min(1),
  }),
  redis: z.object({
    url: z.string().optional(),
  }),
  rateLimit: z.object({
    windowMs: z.string().optional(),
    max: z.string().optional(),
  }),
});

// Parse and validate configuration
const config = configSchema.parse({
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  appUrl: process.env.APP_URL,
  apiUrl: process.env.API_URL,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  mailerlite: {
    apiKey: process.env.MAILERLITE_API_KEY,
    groupId: process.env.MAILERLITE_GROUP_ID,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX,
  },
});

export { config };