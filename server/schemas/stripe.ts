import * as z from 'zod';

export const createCustomerSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
});

export const createSubscriptionSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  plan: z.enum(['pro', 'agency'], {
    errorMap: () => ({ message: 'Plan must be either "pro" or "agency"' }),
  }),
});

export const cancelSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
});

export const createCheckoutSessionSchema = z.object({
  planId: z.enum(['pro_monthly', 'agency_monthly'], {
    errorMap: () => ({ message: 'Invalid plan ID' }),
  }),
  successUrl: z.string().url('Invalid success URL').optional(),
  cancelUrl: z.string().url('Invalid cancel URL').optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type CancelSubscriptionInput = z.infer<typeof cancelSubscriptionSchema>;
export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>; 