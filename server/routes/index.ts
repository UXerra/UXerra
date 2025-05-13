import { Router } from 'express';
import { apiLimiter } from '../middleware/rateLimiter.js';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import subscriptionRoutes from './subscription.js';
import newsletterRoutes from './newsletter.js';
import webhookRoutes from './webhook.js';
import brandingRoutes from './branding.js';
import contentRoutes from './content.js';
import apiKeyRoutes from './apiKey.js';
import auditRoutes from './audit.js';
import adminRoutes from './admin.js';

const router = Router();

// Apply rate limiter to all routes
router.use(apiLimiter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Register routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/newsletters', newsletterRoutes);
router.use('/webhooks', webhookRoutes);
router.use('/branding', brandingRoutes);
router.use('/content', contentRoutes);
router.use('/api-keys', apiKeyRoutes);
router.use('/audit', auditRoutes);
router.use('/admin', adminRoutes);

export default router; 