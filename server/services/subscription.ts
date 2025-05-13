// server/services/subscription.ts

import { PrismaClient } from '@prisma/client';
import { config } from '../config.js';
import { stripeService } from './stripe.js';

const prisma = new PrismaClient();

export const subscriptionService = {
  async createSubscription(userId: string, stripeCustomerId: string) {
    const subscription = await stripeService.createSubscription({
      customerId: stripeCustomerId,
      plan: 'pro' // Default to pro plan
    });
    
    return prisma.subscription.create({
      data: {
        userId,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        plan: 'pro', // Default to pro plan
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });
  },

  async getSubscription(userId: string) {
    return prisma.subscription.findUnique({
      where: { userId },
      include: { user: true },
    });
  },

  async updateSubscription(subscriptionId: string, data: {
    status?: string;
    plan?: string;
    currentPeriodEnd?: Date;
  }) {
    return prisma.subscription.update({
      where: { id: subscriptionId },
      data,
    });
  },

  async cancelSubscription(subscriptionId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    await stripeService.cancelSubscription(subscription.stripeSubscriptionId);

    return prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: 'canceled' },
    });
  },
};

export const example = () => {
    console.log('Subscription service placeholder');
  };
  