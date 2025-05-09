/**
 * Stripe integration utilities
 */

// Initialize Stripe client in the frontend
export const initStripeCheckout = async (sessionId: string): Promise<void> => {
  try {
    // Dynamically import the Stripe.js library
    const { loadStripe } = await import('@stripe/stripe-js');
    
    // Ensure the Stripe public key is available
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';
    
    if (!stripePublicKey) {
      throw new Error('Stripe public key is not set. Please check your environment variables.');
    }
    
    // Initialize Stripe
    const stripe = await loadStripe(stripePublicKey);
    
    if (!stripe) {
      throw new Error('Failed to initialize Stripe.');
    }
    
    // Redirect to Stripe Checkout
    await stripe.redirectToCheckout({
      sessionId
    });
  } catch (error) {
    console.error('Error initializing Stripe checkout:', error);
    throw error;
  }
};

/**
 * Create a formatted price display
 * @param amount Price amount in cents/smallest currency unit
 * @param currency Currency code (default: USD)
 * @returns Formatted price string
 */
export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  });
  
  return formatter.format(amount / 100);
};

export default {
  initStripeCheckout,
  formatPrice
};
