// server/services/newsletter.ts

import { PrismaClient } from '@prisma/client';
import { config } from '../config.js';
import { mailerliteService } from './mailerlite.js';

const prisma = new PrismaClient();

export const newsletterService = {
  async subscribe(email: string, name?: string, fields?: Record<string, any>) {
    // Add to MailerLite
    await mailerliteService.subscribe({
      email,
      name,
      fields,
      groups: [config.mailerlite.groupId],
    });

    // Store in database
    return prisma.newsletterSubscriber.create({
      data: {
        email,
        name,
        status: 'active',
        fields: fields || {},
        groups: [config.mailerlite.groupId],
      },
    });
  },

  async unsubscribe(email: string) {
    // Remove from MailerLite
    await mailerliteService.unsubscribe({ email });

    // Update in database
    return prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: 'unsubscribed' },
    });
  },

  async getSubscriber(email: string) {
    return prisma.newsletterSubscriber.findUnique({
      where: { email },
    });
  },

  async updateSubscriber(email: string, data: {
    name?: string;
    status?: string;
    fields?: Record<string, any>;
    groups?: string[];
  }) {
    return prisma.newsletterSubscriber.update({
      where: { email },
      data,
    });
  },
};
  