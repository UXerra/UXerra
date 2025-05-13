import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/auth.js';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const admin = await prisma.user.create({
      data: {
        email: 'admin@uxerra.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    // Create test user
    const userPassword = await hashPassword('user123');
    const user = await prisma.user.create({
      data: {
        email: 'user@uxerra.com',
        name: 'Test User',
        password: userPassword,
        role: 'USER',
      },
    });

    // Create test subscription
    await prisma.subscription.create({
      data: {
        userId: user.id,
        status: 'ACTIVE',
        plan: 'PRO',
        stripeSubscriptionId: 'sub_test123',
        stripeCustomerId: 'cus_test123',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });

    // Create test newsletter subscribers
    await prisma.newsletterSubscriber.create({
      data: {
        email: 'subscriber1@example.com',
        status: 'SUBSCRIBED',
        source: 'WEBSITE',
      },
    });

    await prisma.newsletterSubscriber.create({
      data: {
        email: 'subscriber2@example.com',
        status: 'SUBSCRIBED',
        source: 'API',
      },
    });

    // Create test branding packages
    await prisma.brandingPackage.create({
      data: {
        userId: user.id,
        name: 'Test Branding',
        status: 'ACTIVE',
        logo: 'https://example.com/logo.png',
        colors: ['#FF0000', '#00FF00', '#0000FF'],
        fonts: ['Arial', 'Helvetica'],
      },
    });

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 