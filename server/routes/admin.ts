import { Router } from 'express';
import * as z from 'zod';
import { adminService } from '../services/admin';
import { authenticate, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Create user schema
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['USER', 'ADMIN']),
});

// Update user schema
const updateUserSchema = createUserSchema.partial();

// Get users route
router.get(
  '/users',
  authenticate,
  requireRole('ADMIN'),
  async (req, res, next) => {
    try {
      const users = await adminService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// Get user route
router.get(
  '/users/:id',
  authenticate,
  requireRole('ADMIN'),
  async (req, res, next) => {
    try {
      const user = await adminService.getUser(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Create user route
router.post(
  '/users',
  authenticate,
  requireRole('ADMIN'),
  validateRequest({ body: createUserSchema }),
  async (req, res, next) => {
    try {
      const user = await adminService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Update user route
router.put(
  '/users/:id',
  authenticate,
  requireRole('ADMIN'),
  validateRequest({ body: updateUserSchema }),
  async (req, res, next) => {
    try {
      const user = await adminService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Delete user route
router.delete(
  '/users/:id',
  authenticate,
  requireRole('ADMIN'),
  async (req, res, next) => {
    try {
      await adminService.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

// Get dashboard stats route
router.get(
  '/dashboard',
  authenticate,
  requireRole('ADMIN'),
  async (req, res, next) => {
    try {
      const stats = await adminService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

// Get system health route
router.get(
  '/health',
  authenticate,
  requireRole('ADMIN'),
  async (req, res, next) => {
    try {
      const health = await adminService.getSystemHealth();
      res.json(health);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 