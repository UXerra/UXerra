import { Router } from 'express';
import * as z from 'zod';
import { apiKeyService } from '../services/apiKey.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auditService } from '../services/audit.js';

const router = Router();

// Create API key schema
const createApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.string()),
  expiresAt: z.string().datetime().optional(),
});

// Update API key schema
const updateApiKeySchema = createApiKeySchema.partial();

// Create API key route
router.post(
  '/',
  authenticate,
  validateRequest({ body: createApiKeySchema }),
  async (req, res, next) => {
    try {
      const { name, permissions } = createApiKeySchema.parse(req.body);
      const apiKey = await apiKeyService.createApiKey(req.user!.id, name, permissions);

      // Log the action
      await auditService.createAuditLog({
        userId: req.user!.id,
        action: 'create_api_key',
        resource: 'api_key',
        resourceId: apiKey.id,
        details: { name, permissions },
        ip: req.ip,
        userAgent: req.get('user-agent') || 'unknown',
      });

      res.status(201).json(apiKey);
    } catch (error) {
      next(error);
    }
  }
);

// Get API keys route
router.get('/', authenticate, async (req, res, next) => {
  try {
    const apiKeys = await apiKeyService.getApiKeys(req.user!.id);
    res.json(apiKeys);
  } catch (error) {
    next(error);
  }
});

// Get API key route
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const apiKey = await apiKeyService.getApiKey(req.params.id);
    res.json(apiKey);
  } catch (error) {
    next(error);
  }
});

// Update API key route
router.put(
  '/:id',
  authenticate,
  validateRequest({ body: updateApiKeySchema }),
  async (req, res, next) => {
    try {
      const apiKey = await apiKeyService.updateApiKey(
        req.params.id,
        req.body
      );
      res.json(apiKey);
    } catch (error) {
      next(error);
    }
  }
);

// Delete API key route
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await apiKeyService.deleteApiKey(req.user!.id, req.params.id);

    // Log the action
    await auditService.createAuditLog({
      userId: req.user!.id,
      action: 'delete_api_key',
      resource: 'api_key',
      resourceId: req.params.id,
      ip: req.ip,
      userAgent: req.get('user-agent') || 'unknown',
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Regenerate API key route
router.post(
  '/:id/regenerate',
  authenticate,
  async (req, res, next) => {
    try {
      const apiKey = await apiKeyService.regenerateApiKey(req.params.id);
      res.json(apiKey);
    } catch (error) {
      next(error);
    }
  }
);

export default router; 