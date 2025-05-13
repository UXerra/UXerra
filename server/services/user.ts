import { PrismaClient } from '@prisma/client';
import { config } from '../config.js';
import { stripeService } from './stripe.js';
import { subscriptionService } from './subscription.js';
import { AppError } from '../utils/error.js';
import { hashPassword, comparePasswords } from '../utils/auth.js';
import { generateToken } from '../utils/jwt.js';
import { auditService } from './audit.js';
import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { CreateUserInput, UpdateUserInput } from '../../shared/types.js';

const prisma = new PrismaClient();

class UserService {
  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new AppError(400, 'User already exists');
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create Stripe customer
      const customer = await stripeService.createCustomer({ email, name });

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          stripeCustomerId: customer.id,
        },
      });

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Log registration
      await auditService.createAuditLog({
        userId: user.id,
        action: 'register',
        resource: 'user',
        resourceId: user.id,
        details: { email, name },
        ip: 'system',
        userAgent: 'system',
      });

      return { user, token };
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to register user');
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Verify password
      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid credentials');
      }

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // Log login
      await auditService.createAuditLog({
        userId: user.id,
        action: 'login',
        resource: 'user',
        resourceId: user.id,
        details: { email },
        ip: 'system',
        userAgent: 'system',
      });

      return { user, token };
    } catch (error) {
      console.error('Failed to login user:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to login user');
    }
  }

  async getProfile(userId: string): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      return user;
    } catch (error) {
      console.error('Failed to get user profile:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to get user profile');
    }
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    try {
      // Remove sensitive fields
      const { password, role, stripeCustomerId, ...updateData } = data;

      const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      // Log profile update
      await auditService.createAuditLog({
        userId,
        action: 'update_profile',
        resource: 'user',
        resourceId: userId,
        details: updateData,
        ip: 'system',
        userAgent: 'system',
      });

      return user;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to update user profile');
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      // Verify current password
      const isValidPassword = await comparePasswords(currentPassword, user.password);
      if (!isValidPassword) {
        throw new AppError(401, 'Invalid current password');
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      // Log password change
      await auditService.createAuditLog({
        userId,
        action: 'change_password',
        resource: 'user',
        resourceId: userId,
        details: {},
        ip: 'system',
        userAgent: 'system',
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to change password');
    }
  }

  async deleteAccount(userId: string): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { subscription: true },
      });
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      // Cancel Stripe subscription if exists
      if (user.subscription) {
        await stripeService.cancelSubscription(user.subscription.stripeSubscriptionId);
      }

      // Delete user
      await prisma.user.delete({
        where: { id: userId },
      });

      // Log account deletion
      await auditService.createAuditLog({
        userId,
        action: 'delete_account',
        resource: 'user',
        resourceId: userId,
        details: {},
        ip: 'system',
        userAgent: 'system',
      });
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error instanceof AppError ? error : new AppError(500, 'Failed to delete account');
    }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        name: input.name,
        role: 'USER',
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      include: { subscription: true },
    });
  }

  async getProfile(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { subscription: true },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateProfile(id: string, input: UpdateUserInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: input,
    });
  }

  async verifyPassword(id: string, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');
    return bcrypt.compare(password, user.password);
  }
}

export const userService = new UserService(); 