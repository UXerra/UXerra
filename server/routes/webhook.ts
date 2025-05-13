import { Router } from 'express';
import { webhookService } from '../services/webhook.js';
import { webhookLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Stripe webhook route
router.post(
  '/stripe',
  webhookLimiter,
  async (req, res, next) => {
    try {
      const event = await webhookService.handleStripeWebhook(
        req.body,
        req.headers['stripe-signature'] as string
      );
      res.json({ received: true, event });
    } catch (error) {
      next(error);
    }
  }
);

// MailerLite webhook route
router.post(
  '/mailerlite',
  webhookLimiter,
  async (req, res, next) => {
    try {
      const event = await webhookService.handleMailerLiteWebhook(req.body);
      res.json({ received: true, event });
    } catch (error) {
      next(error);
    }
  }
);

// Get webhook events route (admin only)
router.get(
  '/events',
  async (req, res, next) => {
    try {
      const events = await webhookService.getEvents();
      res.json(events);
    } catch (error) {
      next(error);
    }
  }
);

// Get webhook event route (admin only)
router.get(
  '/events/:id',
  async (req, res, next) => {
    try {
      const event = await webhookService.getEvent(req.params.id);
      res.json(event);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 