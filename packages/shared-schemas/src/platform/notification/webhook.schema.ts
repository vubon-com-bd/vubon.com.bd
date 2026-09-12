import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { WEBHOOK } from '@vubon/shared-constants/src/platform/notification/webhook.constants';

const webhookStatusKeys = Object.keys(WEBHOOK.STATUS) as [string, ...string[]];
const webhookTypeKeys = Object.keys(WEBHOOK.TYPES) as [string, ...string[]];
const webhookProviderKeys = Object.keys(WEBHOOK.WEBHOOK_PROVIDERS) as [string, ...string[]];

export const WebhookSchema = BaseSchema.extend({
  webhookId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(webhookStatusKeys),
  type: z.enum(webhookTypeKeys),
  provider: z.enum(webhookProviderKeys),
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string()),
  payload: z.unknown(),
  response: z.unknown().optional(),
  statusCode: z.number().int().min(100).max(599).optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(5),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
