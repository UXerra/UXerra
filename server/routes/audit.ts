import { Router } from 'express';
import * as z from 'zod';
import { auditService } from '../services/audit';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

// Get audit logs schema
const getAuditLogsSchema = z.object({
  userId: z.string().optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  resourceId: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

// Get audit logs route (admin only)
router.get(
  '/',
  authenticate,
  validateRequest({ query: getAuditLogsSchema }),
  async (req, res, next) => {
    try {
      const logs = await auditService.getLogs(req.query);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
);

// Get audit log route (admin only)
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const log = await auditService.getLog(req.params.id);
    res.json(log);
  } catch (error) {
    next(error);
  }
});

// Get user audit logs route (admin only)
router.get(
  '/user/:userId',
  authenticate,
  validateRequest({ query: getAuditLogsSchema }),
  async (req, res, next) => {
    try {
      const logs = await auditService.getUserLogs(
        req.params.userId,
        req.query
      );
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
);

// Get resource audit logs route (admin only)
router.get(
  '/resource/:resource/:resourceId',
  authenticate,
  validateRequest({ query: getAuditLogsSchema }),
  async (req, res, next) => {
    try {
      const logs = await auditService.getResourceLogs(
        req.params.resource,
        req.params.resourceId,
        req.query
      );
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 