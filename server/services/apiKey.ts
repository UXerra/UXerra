import { prisma } from './database.js';
import { AppError } from '../utils/error.js';
import { generateApiKey } from '../utils/apiKey.js';

export const apiKeyService = {
  async createApiKey(userId: string, name: string, permissions: string[]) {
    const key = generateApiKey();
    const hashedKey = await prisma.apiKey.create({
      data: {
        key,
        name,
        permissions,
        userId,
      },
    });

    return {
      ...hashedKey,
      key, // Only return the actual key once during creation
    };
  },

  async getApiKeys(userId: string) {
    return prisma.apiKey.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        permissions: true,
        createdAt: true,
        lastUsed: true,
      },
    });
  },

  async deleteApiKey(userId: string, apiKeyId: string) {
    const apiKey = await prisma.apiKey.findFirst({
      where: { id: apiKeyId, userId },
    });

    if (!apiKey) {
      throw new AppError('API key not found', 404);
    }

    await prisma.apiKey.delete({
      where: { id: apiKeyId },
    });
  },

  async validateApiKey(key: string) {
    const apiKey = await prisma.apiKey.findUnique({
      where: { key },
      include: { user: true },
    });

    if (!apiKey) {
      throw new AppError('Invalid API key', 401);
    }

    // Update last used timestamp
    await prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsed: new Date() },
    });

    return {
      userId: apiKey.userId,
      permissions: apiKey.permissions,
      user: {
        id: apiKey.user.id,
        email: apiKey.user.email,
        role: apiKey.user.role,
      },
    };
  },
}; 