import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { AppError } from '../utils/error.js';
import { prisma } from '../services/database.js';
import { userService } from '../services/user.js';
import { auditService } from '../services/audit.js';
import type { AuthUser } from '../../shared/types.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;

    // Log authentication
    await auditService.createAuditLog({
      userId: user.id,
      action: 'authenticate',
      resource: 'auth',
      resourceId: user.id,
      details: { method: req.method, path: req.path },
      ip: req.ip,
      userAgent: req.get('user-agent') || 'unknown',
    });

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized', 403));
    }

    next();
  };
};

export const requireSubscription = (plans: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    try {
      const user = await userService.getProfile(req.user.id);
      if (!user.subscription || !plans.includes(user.subscription.plan)) {
        return next(new AppError('Subscription required', 403));
      }

      if (user.subscription.status !== 'ACTIVE') {
        return next(new AppError('Active subscription required', 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const generateToken = (user: { id: string; email: string; role: string }): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.app.jwtSecret,
    { expiresIn: '7d' }
  );
}; 