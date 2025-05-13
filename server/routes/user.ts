import { Router } from 'express';
import * as z from 'zod';
import { userService } from '../services/user';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Get profile schema
const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});

// Change password schema
const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

// Get profile route
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update profile route
router.put(
  '/me',
  authenticate,
  validateRequest({ body: updateProfileSchema }),
  async (req, res, next) => {
    try {
      const user = await userService.updateProfile(req.user!.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Change password route
router.post(
  '/me/change-password',
  authenticate,
  validateRequest({ body: changePasswordSchema }),
  async (req, res, next) => {
    try {
      await userService.changePassword(
        req.user!.id,
        req.body.currentPassword,
        req.body.newPassword
      );
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      next(error);
    }
  }
);

// Delete account route
router.delete('/me', authenticate, async (req, res, next) => {
  try {
    await userService.deleteAccount(req.user!.id);
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 