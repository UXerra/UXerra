import { Request, Response, NextFunction } from 'express';
import { AppError, isAppError } from '../utils/error';
import { config } from '../config';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const appError = isAppError(error) ? error : new AppError('Internal server error', 500, false);

  // Log error in development
  if (config.env === 'development') {
    console.error('Error:', {
      message: appError.message,
      stack: appError.stack,
      statusCode: appError.statusCode,
    });
  }

  // Send error response
  res.status(appError.statusCode).json({
    status: 'error',
    message: appError.message,
    ...(config.env === 'development' && { stack: appError.stack }),
  });
}; 