import { PrismaClient } from '@prisma/client';
import { config } from '../config';

// Initialize Prisma client
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url,
    },
  },
  log: config.env === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Handle connection errors
prisma.$on('error', (e) => {
  console.error('Prisma Client error:', e);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 