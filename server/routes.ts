import { Express } from 'express';
import { createServer } from 'http';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import subscriptionRoutes from './routes/subscription';
import aiRoutes from './routes/ai';
import newsletterRoutes from './routes/newsletter';
import webhookRoutes from './routes/webhook';
import { apiLimiter } from './middleware/rateLimiter';

export async function registerRoutes(app: Express) {
  // Apply rate limiter to all routes
  app.use(apiLimiter);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/webhooks', webhookRoutes);

  // Create HTTP server
  const server = createServer(app);

  return server;
}
