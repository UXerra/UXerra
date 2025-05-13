import Stripe from 'stripe';
import { config } from '../config.js';
import { AppError } from '../utils/error.js';
import type {
  CreateCustomerInput,
  CreateSubscriptionInput,
  CreateCheckoutSessionInput,
} from '../schemas/stripe.js';

class StripeService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer({ email, name }: CreateCustomerInput): Promise<Stripe.Customer> {
    try {
      return await this.stripe.customers.create({ email, name });
    } catch (error) {
      console.error('Failed to create Stripe customer:', error);
      throw new AppError(500, 'Failed to create customer');
    }
  }

  async createSubscription({ customerId, plan }: CreateSubscriptionInput): Promise<Stripe.Subscription> {
    try {
      const priceId = plan === 'pro' 
        ? config.stripe.proPriceId 
        : config.stripe.agencyPriceId;

      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
    } catch (error) {
      console.error('Failed to create Stripe subscription:', error);
      throw new AppError(500, 'Failed to create subscription');
    }
  }

  async createCheckoutSession({
    planId,
    successUrl,
    cancelUrl,
  }: CreateCheckoutSessionInput): Promise<Stripe.Checkout.Session> {
    try {
      const priceId = planId === 'pro_monthly'
        ? config.stripe.proPriceId
        : config.stripe.agencyPriceId;

      return await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        success_url: successUrl || `${config.app.url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${config.app.url}/pricing`,
      });
    } catch (error) {
      console.error('Failed to create Stripe checkout session:', error);
      throw new AppError(500, 'Failed to create checkout session');
    }
  }

  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      return await this.stripe.subscriptions.retrieve(subscriptionId);
    } catch (error) {
      console.error('Failed to get Stripe subscription:', error);
      throw new AppError(500, 'Failed to get subscription');
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      return await this.stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      console.error('Failed to cancel Stripe subscription:', error);
      throw new AppError(500, 'Failed to cancel subscription');
    }
  }

  async constructWebhookEvent(payload: string, signature: string): Promise<Stripe.Event> {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        config.stripe.webhookSecret || ''
      );
    } catch (error) {
      console.error('Failed to construct Stripe webhook event:', error);
      throw new AppError(400, 'Invalid webhook signature');
    }
  }
}

export const stripeService = new StripeService(); 