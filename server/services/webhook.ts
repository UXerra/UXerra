// server/services/webhook.ts
import { PrismaClient } from '@prisma/client';
import { config } from '../config.js';
import { stripeService } from './stripe.js';
import { subscriptionService } from './subscription.js';

const prisma = new PrismaClient();

export const webhookService = {
  async handleStripeWebhook(event: any) {
    // Store webhook event
    const webhookEvent = await prisma.webhookEvent.create({
      data: {
        type: event.type,
        provider: 'stripe',
        payload: event,
        status: 'received',
      },
    });

    try {
      // Handle different event types
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await subscriptionService.updateSubscription(
            event.data.object.id,
            {
              status: event.data.object.status,
              currentPeriodEnd: new Date(event.data.object.current_period_end * 1000),
            }
          );
          break;

        case 'customer.subscription.deleted':
          await subscriptionService.cancelSubscription(event.data.object.id);
          break;
      }

      // Update webhook status
      await prisma.webhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          status: 'processed',
          processedAt: new Date(),
        },
      });
    } catch (error: any) {
      // Update webhook status with error
      await prisma.webhookEvent.update({
        where: { id: webhookEvent.id },
        data: {
          status: 'failed',
          error: error?.message || 'Unknown error',
          processedAt: new Date(),
        },
      });
      throw error;
    }
  },

  async getWebhookEvents(limit = 10) {
    return prisma.webhookEvent.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },
};
  