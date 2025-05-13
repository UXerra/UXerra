import { PrismaClient } from '@prisma/client';
import { AuditLog } from '../../shared/types.js';

const prisma = new PrismaClient();

export class AuditService {
  async createAuditLog(input: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
    const log = await prisma.auditLog.create({
      data: input,
    });
    return log;
  }

  async getAuditLogs(userId: string, page = 1, limit = 10): Promise<AuditLog[]> {
    const logs = await prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return logs;
  }
}

export const auditService = new AuditService(); 