import * as z from 'zod';

export const subscribeNewsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().optional(),
  fields: z.record(z.string()).optional(),
  groups: z.array(z.string()).optional(),
});

export const unsubscribeNewsletterSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export type SubscribeNewsletterInput = z.infer<typeof subscribeNewsletterSchema>;
export type UnsubscribeNewsletterInput = z.infer<typeof unsubscribeNewsletterSchema>; 