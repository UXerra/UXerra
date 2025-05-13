import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;

    if (res.statusCode >= 500) {
      console.error('❌', message);
    } else if (res.statusCode >= 400) {
      console.warn('⚠️', message);
    } else {
      console.log('✅', message);
    }

    if (config.env === 'development') {
      console.debug('Request details:', {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        query: req.query,
        body: req.body,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      });
    }
  });

  next();
}; 