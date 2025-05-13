import * as z from 'zod';
import { env } from '../config.js';

const envSchema = z.object({
  // Stripe Configuration
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key is required'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'Stripe publishable key is required'),
  STRIPE_PRO_PRICE_ID: z.string().min(1, 'Stripe Pro price ID is required'),
  STRIPE_AGENCY_PRICE_ID: z.string().min(1, 'Stripe Agency price ID is required'),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),

  // MailerLite Configuration
  MAILERLITE_API_KEY: z.string().min(1, 'MailerLite API key is required'),
  MAILERLITE_GROUP_ID: z.string().min(1, 'MailerLite group ID is required'),

  // Application Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL format'),
  PORT: z.string().optional(),
});

export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:', error.format());
      process.exit(1);
    }
    throw error;
  }
} 