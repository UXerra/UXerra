import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic AI Branding Tools',
      '5 Templates per Month',
      'Community Support',
      'Basic Analytics',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    features: [
      'Advanced AI Tools',
      'Unlimited Templates',
      'Priority Support',
      'Advanced Analytics',
      'Custom Branding',
      'API Access',
    ],
    cta: 'Subscribe Now',
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 99,
    features: [
      'Everything in Pro',
      'Team Collaboration',
      'White-label Options',
      'Custom Integrations',
      'Dedicated Support',
      'Training Sessions',
    ],
    cta: 'Contact Sales',
  },
];

export function SubscriptionPlans() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(planId);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('Choose Your Plan')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('Select the perfect plan for your needs')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary px-4 py-1 rounded-full text-sm font-medium">
                  {t('Most Popular')}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-full font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {loading === plan.id ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  plan.cta
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 