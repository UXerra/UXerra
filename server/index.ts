import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config.js';
import { errorHandler } from './middleware/errorHandler.js';
import { rateLimit } from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import subscriptionRoutes from './routes/subscription.js';
import auditRoutes from './routes/audit.js';
import apiKeyRoutes from './routes/apiKey.js';

const app = express();

// Security and performance middleware
app.use(helmet());
app.use(cors({
  origin: config.appUrl,
  credentials: true,
}));
app.use(compression());
app.use(express.json());

// Rate limiting
app.use(rateLimit({
  windowMs: Number(config.rateLimit.windowMs) || 60000, // 1 minute default
  max: Number(config.rateLimit.max) || 100, // 100 requests per window
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/keys', apiKeyRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler
app.use(errorHandler);

// Start server on configured port
app.listen(Number(config.port), () => {
  console.log(`🚀 Server running on port ${config.port}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${config.port} is already in use. Please free the port or change the PORT in your .env file.`);
    process.exit(1);
  } else {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
});
