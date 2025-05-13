import { z } from 'zod';
import { stripe } from '../lib/stripe';
import { env } from '../config';
import { handleError } from '../error';

const subscriptionPlans = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic templates', 'Community support'],
  },
  pro: {
    name: 'Pro',
    price: 29,
    features: ['All Free features', 'Premium templates', 'Priority support'],
    stripePriceId: env.stripe?.proPriceId,
  },
  agency: {
    name: 'Agency',
    price: 99,
    features: ['All Pro features', 'Custom templates', 'Dedicated support'],
    stripePriceId: env.stripe?.agencyPriceId,
  },
} as const;

type PlanId = keyof typeof subscriptionPlans;

const createCheckoutSchema = z.object({
  planId: z.enum(['free', 'pro', 'agency'] as const),
});

export async function POST(req: Request) {
  try {
    // Check if Stripe is enabled
    if (!env.features.STRIPE_ENABLED) {
      return new Response(
        JSON.stringify({
          error: 'Stripe integration is not configured',
          message: 'Please contact support for assistance',
        }),
        { status: 503 }
      );
    }

    const body = await req.json();
    const { planId } = createCheckoutSchema.parse(body) as { planId: PlanId };

    // Handle free plan
    if (planId === 'free') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Free plan activated',
          plan: subscriptionPlans.free,
        }),
        { status: 200 }
      );
    }

    // Validate plan configuration
    const plan = subscriptionPlans[planId];
    if (!plan.stripePriceId) {
      throw new Error(`Stripe price ID not configured for ${planId} plan`);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${env.app.url}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.app.url}/pricing`,
      metadata: {
        planId,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        sessionId: session.id,
        url: session.url,
      }),
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
} 