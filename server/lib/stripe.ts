import Stripe from 'stripe';
import { env, getFeatureConfig } from '../config';

// Initialize Stripe instance
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    try {
      const stripeConfig = getFeatureConfig('stripe');
      
      if (!stripeConfig.enabled) {
        throw new Error('Stripe is not enabled');
      }

      if (!stripeConfig.secretKey) {
        throw new Error('Stripe secret key is missing');
      }

      console.log('🔑 Initializing Stripe with configuration:', {
        environment: env.app.env,
        hasSecretKey: !!stripeConfig.secretKey,
        hasPublishableKey: !!stripeConfig.publishableKey,
        hasProPriceId: !!stripeConfig.proPriceId,
        hasAgencyPriceId: !!stripeConfig.agencyPriceId,
        hasWebhookSecret: !!stripeConfig.webhookSecret,
      });

      stripeInstance = new Stripe(stripeConfig.secretKey, {
        apiVersion: '2023-10-16',
        typescript: true,
      });

      console.log('✅ Stripe initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Stripe:', error);
      throw error;
    }
  }

  return stripeInstance;
}

// Type definitions for Stripe entities
export type StripePrice = Stripe.Price;
export type StripeProduct = Stripe.Product;
export type StripeCustomer = Stripe.Customer;
export type StripeSubscription = Stripe.Subscription;

// Helper functions for common Stripe operations
export async function createCustomer(email: string, name: string): Promise<StripeCustomer> {
  const stripe = getStripe();
  return stripe.customers.create({ email, name });
}

export async function createSubscription(
  customerId: string,
  priceId: string
): Promise<StripeSubscription> {
  const stripe = getStripe();
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });
}

export async function getSubscription(subscriptionId: string): Promise<StripeSubscription> {
  const stripe = getStripe();
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(subscriptionId: string): Promise<StripeSubscription> {
  const stripe = getStripe();
  return stripe.subscriptions.cancel(subscriptionId);
}

// Price ID getters
export function getProPriceId(): string {
  const stripeConfig = getFeatureConfig('stripe');
  return stripeConfig.proPriceId;
}

export function getAgencyPriceId(): string {
  const stripeConfig = getFeatureConfig('stripe');
  return stripeConfig.agencyPriceId;
}

// Webhook secret getter
export function getWebhookSecret(): string | undefined {
  const stripeConfig = getFeatureConfig('stripe');
  return stripeConfig.webhookSecret;
}
