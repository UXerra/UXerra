import * as z from 'zod';

export const generateContentSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  contentType: z.enum(['landing_page', 'blog_post', 'email', 'social_post'], {
    errorMap: () => ({ message: 'Invalid content type' }),
  }),
  tone: z.enum(['professional', 'casual', 'friendly', 'formal'], {
    errorMap: () => ({ message: 'Invalid tone' }),
  }),
  maxTokens: z.number().min(1).max(4000).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

export const generateBrandingSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  industry: z.string().min(1, 'Industry is required'),
  goal: z.string().min(1, 'Goal is required'),
  description: z.string().min(1, 'Description is required'),
  targetAudience: z.string().min(1, 'Target audience is required'),
  style: z.enum(['modern', 'classic', 'minimalist', 'bold', 'playful'], {
    errorMap: () => ({ message: 'Invalid style' }),
  }),
  colorPreference: z.string().optional(),
});

export type GenerateContentInput = z.infer<typeof generateContentSchema>;
export type GenerateBrandingInput = z.infer<typeof generateBrandingSchema>; 