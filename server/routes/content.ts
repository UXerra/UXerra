import { Router } from 'express';
import * as z from 'zod';
import { contentService } from '../services/content';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Generate content schema
const generateContentSchema = z.object({
  type: z.enum(['blog', 'social', 'email', 'website']),
  prompt: z.string().min(10),
  tone: z.string().min(2),
  maxTokens: z.number().min(1).max(4000).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

// Update content schema
const updateContentSchema = z.object({
  content: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

// Generate content route
router.post(
  '/generate',
  authenticate,
  validateRequest({ body: generateContentSchema }),
  async (req, res, next) => {
    try {
      const content = await contentService.generateContent(
        req.user!.id,
        req.body
      );
      res.status(201).json(content);
    } catch (error) {
      next(error);
    }
  }
);

// Get content route
router.get('/', authenticate, async (req, res, next) => {
  try {
    const content = await contentService.getContent(req.user!.id);
    res.json(content);
  } catch (error) {
    next(error);
  }
});

// Get content by ID route
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const content = await contentService.getContentById(req.params.id);
    res.json(content);
  } catch (error) {
    next(error);
  }
});

// Update content route
router.put(
  '/:id',
  authenticate,
  validateRequest({ body: updateContentSchema }),
  async (req, res, next) => {
    try {
      const content = await contentService.updateContent(
        req.params.id,
        req.body
      );
      res.json(content);
    } catch (error) {
      next(error);
    }
  }
);

// Delete content route
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await contentService.deleteContent(req.params.id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Regenerate content route
router.post(
  '/:id/regenerate',
  authenticate,
  validateRequest({ body: generateContentSchema }),
  async (req, res, next) => {
    try {
      const content = await contentService.regenerateContent(
        req.params.id,
        req.body
      );
      res.json(content);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 