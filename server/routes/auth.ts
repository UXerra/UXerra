import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { AppError } from '../utils/error.js';
import { generateToken } from '../utils/jwt.js';
import { userService } from '../services/user.js';

const router = Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      throw new AppError(409, 'Email already exists');
    }

    // Create user
    const user = await userService.createUser({
      email,
      password,
      name,
    });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userService.findByEmail(email);
    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Verify password
    const isValid = await userService.verifyPassword(user.id, password);
    if (!isValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get profile
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user!.id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router; 