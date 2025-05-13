import { Router } from 'express';
import * as z from 'zod';
import { newsletterService } from '../services/newsletter.js';
import { authenticate } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Subscribe schema
const subscribeSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  groups: z.array(z.string()).optional(),
});

// Unsubscribe schema
const unsubscribeSchema = z.object({
  email: z.string().email(),
});

// Subscribe route
router.post(
  '/subscribe',
  validateRequest({ body: subscribeSchema }),
  async (req, res, next) => {
    try {
      const subscriber = await newsletterService.subscribe(
        req.body.email,
        req.body.name,
        req.body.groups
      );
      res.status(201).json(subscriber);
    } catch (error) {
      next(error);
    }
  }
);

// Unsubscribe route
router.post(
  '/unsubscribe',
  validateRequest({ body: unsubscribeSchema }),
  async (req, res, next) => {
    try {
      await newsletterService.unsubscribe(req.body.email);
      res.json({ message: 'Unsubscribed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

// Get subscribers route (admin only)
router.get(
  '/subscribers',
  authenticate,
  async (req, res, next) => {
    try {
      const subscribers = await newsletterService.getSubscribers();
      res.json(subscribers);
    } catch (error) {
      next(error);
    }
  }
);

// Get subscriber route (admin only)
router.get(
  '/subscribers/:email',
  authenticate,
  async (req, res, next) => {
    try {
      const subscriber = await newsletterService.getSubscriber(req.params.email);
      res.json(subscriber);
    } catch (error) {
      next(error);
    }
  }
);

// Update subscriber route (admin only)
router.put(
  '/subscribers/:email',
  authenticate,
  validateRequest({ body: subscribeSchema }),
  async (req, res, next) => {
    try {
      const subscriber = await newsletterService.updateSubscriber(
        req.params.email,
        req.body
      );
      res.json(subscriber);
    } catch (error) {
      next(error);
    }
  }
);

// Delete subscriber route (admin only)
router.delete(
  '/subscribers/:email',
  authenticate,
  async (req, res, next) => {
    try {
      await newsletterService.deleteSubscriber(req.params.email);
      res.json({ message: 'Subscriber deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

export default router; 