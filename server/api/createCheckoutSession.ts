import { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

// Site URL from environment
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';

/**
 * Get price ID based on plan ID
 * @param planId Plan ID string
 * @returns Price ID string or null if not found
 */
const getPriceId = (planId: string): string | null => {
  switch (planId) {
    case 'pro_monthly':
      return process.env.STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly';
    case 'agency_monthly':
      return process.env.STRIPE_PRICE_AGENCY_MONTHLY || 'price_agency_monthly';
    default:
      return null;
  }
};

/**
 * Create a Stripe checkout session
 * @param req Express request
 * @param res Express response
 */
export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { planId, customerId } = req.body;
    
    if (!planId) {
      return res.status(400).json({ message: 'Plan ID is required' });
    }
    
    // Get price ID based on plan ID
    const priceId = getPriceId(planId);
    
    if (!priceId) {
      return res.status(400).json({ message: 'Invalid plan ID' });
    }
    
    // Default to subscription mode
    const mode: Stripe.Checkout.SessionCreateParams.Mode = 'subscription';
    
    // Create checkout session options
    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pricing`,
    };
    
    // If customer ID is provided, associate with existing customer
    if (customerId) {
      sessionOptions.customer = customerId;
    }
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionOptions);
    
    // Return checkout session URL
    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      message: 'Failed to create checkout session',
      error: error.message 
    });
  }
};

export default createCheckoutSession;
