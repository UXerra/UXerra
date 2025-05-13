import { Router } from 'express';
import * as z from 'zod';
import { openaiService } from '../services/openai';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Generate content idea
const generateIdeaSchema = z.object({
  industry: z.string().min(1),
  targetAudience: z.string().min(1),
  goal: z.string().min(1),
  tone: z.enum(['professional', 'casual', 'friendly', 'formal']),
  maxTokens: z.number().min(1).max(4000).default(2000),
  temperature: z.number().min(0).max(1).default(0.7),
});

router.post(
  '/generate-idea',
  authenticate,
  validateRequest({ body: generateIdeaSchema }),
  async (req, res, next) => {
    try {
      const idea = await openaiService.generateIdea(req.body);
      res.json(idea);
    } catch (error) {
      next(error);
    }
  }
);

// Suggest brand identity
const suggestBrandSchema = z.object({
  name: z.string().min(1),
  industry: z.string().min(1),
  goal: z.string().min(1),
  description: z.string().min(1),
  targetAudience: z.string().min(1),
  style: z.enum(['modern', 'classic', 'minimalist', 'bold', 'playful']),
  colorPreference: z.string().optional(),
});

router.post(
  '/suggest-brand',
  authenticate,
  validateRequest({ body: suggestBrandSchema }),
  async (req, res, next) => {
    try {
      const brand = await openaiService.generateBranding(req.body);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  }
);

// Plan marketing strategy
const planStrategySchema = z.object({
  businessType: z.string().min(1),
  industry: z.string().min(1),
  targetAudience: z.string().min(1),
  goals: z.array(z.string()),
  budget: z.enum(['low', 'medium', 'high']),
  timeline: z.enum(['short', 'medium', 'long']),
  channels: z.array(z.string()).optional(),
});

router.post(
  '/plan-strategy',
  authenticate,
  validateRequest({ body: planStrategySchema }),
  async (req, res, next) => {
    try {
      const strategy = await openaiService.generateStrategy(req.body);
      res.json(strategy);
    } catch (error) {
      next(error);
    }
  }
);

// Generate content
const generateContentSchema = z.object({
  type: z.enum(['landing_page', 'blog_post', 'email', 'social_post']),
  prompt: z.string().min(1),
  tone: z.enum(['professional', 'casual', 'friendly', 'formal']),
  maxTokens: z.number().min(1).max(4000).default(2000),
  temperature: z.number().min(0).max(1).default(0.7),
});

router.post(
  '/generate-content',
  authenticate,
  validateRequest({ body: generateContentSchema }),
  async (req, res, next) => {
    try {
      const content = await openaiService.generateContent(req.body);
      res.json(content);
    } catch (error) {
      next(error);
    }
  }
);

// Generate SEO optimization
const generateSeoSchema = z.object({
  content: z.string().min(1),
  keywords: z.array(z.string()),
  targetAudience: z.string().min(1),
  industry: z.string().min(1),
});

router.post(
  '/generate-seo',
  authenticate,
  validateRequest({ body: generateSeoSchema }),
  async (req, res, next) => {
    try {
      const seo = await openaiService.generateSEO(req.body);
      res.json(seo);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 