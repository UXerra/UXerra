import { Router } from 'express';
import * as z from 'zod';
import { subscriptionService } from '../services/subscription';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Create checkout session schema
const createCheckoutSessionSchema = z.object({
  priceId: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

// Create portal session schema
const createPortalSessionSchema = z.object({
  returnUrl: z.string().url(),
});

// Get subscription route
router.get('/', authenticate, async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getSubscription(req.user!.id);
    res.json(subscription);
  } catch (error) {
    next(error);
  }
});

// Create checkout session route
router.post(
  '/create-checkout-session',
  authenticate,
  validateRequest({ body: createCheckoutSessionSchema }),
  async (req, res, next) => {
    try {
      const session = await subscriptionService.createCheckoutSession(
        req.user!.id,
        req.body.priceId,
        req.body.successUrl,
        req.body.cancelUrl
      );
      res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
      next(error);
    }
  }
);

// Create portal session route
router.post(
  '/create-portal-session',
  authenticate,
  validateRequest({ body: createPortalSessionSchema }),
  async (req, res, next) => {
    try {
      const session = await subscriptionService.createPortalSession(
        req.user!.id,
        req.body.returnUrl
      );
      res.json({ url: session.url });
    } catch (error) {
      next(error);
    }
  }
);

// Cancel subscription route
router.post('/cancel', authenticate, async (req, res, next) => {
  try {
    await subscriptionService.cancelSubscription(req.user!.id);
    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 