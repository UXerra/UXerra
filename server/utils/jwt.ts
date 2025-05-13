import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { AppError } from './error.js';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (payload: TokenPayload): string => {
  try {
    const secret = config.jwt.secret;
    if (!secret) {
      throw new AppError('JWT secret is not configured', 500);
    }
    return jwt.sign(payload, secret, {
      expiresIn: config.jwt.expiresIn,
    } as jwt.SignOptions);
  } catch (error) {
    throw new AppError('Failed to generate token', 500);
  }
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    const secret = config.jwt.secret;
    if (!secret) {
      throw new AppError('JWT secret is not configured', 500);
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded || typeof decoded !== 'object') {
      throw new AppError('Invalid token', 401);
    }
    return decoded as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401);
    }
    throw new AppError('Failed to verify token', 500);
  }
}; 