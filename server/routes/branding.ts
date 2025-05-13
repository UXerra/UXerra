import { Router } from 'express';
import * as z from 'zod';
import { brandingService } from '../services/branding';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Create branding package schema
const createBrandingPackageSchema = z.object({
  name: z.string().min(2),
  industry: z.string().min(2),
  goal: z.string().min(2),
  description: z.string().min(10),
  targetAudience: z.string().min(2),
  style: z.string().min(2),
  colorPreference: z.string().optional(),
});

// Update branding package schema
const updateBrandingPackageSchema = createBrandingPackageSchema.partial();

// Create branding package route
router.post(
  '/',
  authenticate,
  validateRequest({ body: createBrandingPackageSchema }),
  async (req, res, next) => {
    try {
      const package = await brandingService.createPackage(
        req.user!.id,
        req.body
      );
      res.status(201).json(package);
    } catch (error) {
      next(error);
    }
  }
);

// Get branding packages route
router.get('/', authenticate, async (req, res, next) => {
  try {
    const packages = await brandingService.getPackages(req.user!.id);
    res.json(packages);
  } catch (error) {
    next(error);
  }
});

// Get branding package route
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const package = await brandingService.getPackage(req.params.id);
    res.json(package);
  } catch (error) {
    next(error);
  }
});

// Update branding package route
router.put(
  '/:id',
  authenticate,
  validateRequest({ body: updateBrandingPackageSchema }),
  async (req, res, next) => {
    try {
      const package = await brandingService.updatePackage(
        req.params.id,
        req.body
      );
      res.json(package);
    } catch (error) {
      next(error);
    }
  }
);

// Delete branding package route
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await brandingService.deletePackage(req.params.id);
    res.json({ message: 'Branding package deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Generate branding package route
router.post(
  '/:id/generate',
  authenticate,
  async (req, res, next) => {
    try {
      const result = await brandingService.generatePackage(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 