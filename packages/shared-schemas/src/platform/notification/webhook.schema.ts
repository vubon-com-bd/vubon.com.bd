/**
 * Webhook Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/webhook.constants থেকে।
 */

import { z } from 'zod';
import {
  WEBHOOK_METHOD,
  WEBHOOK_STATUS,
  WEBHOOK_DELIVERY_STATUS,
  WEBHOOK_EVENT,
} from '@vubon/shared-constants/platform';

export const WebhookMethodSchema = z.enum(Object.values(WEBHOOK_METHOD) as [string, ...string[]]);

export const WebhookStatusSchema = z.enum(Object.values(WEBHOOK_STATUS) as [string, ...string[]]);

export const WebhookDeliveryStatusSchema = z.enum(
  Object.values(WEBHOOK_DELIVERY_STATUS) as [string, ...string[]]
);

export const WebhookEventSchema = z.enum(Object.values(WEBHOOK_EVENT) as [string, ...string[]]);

export const WebhookSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  url: z.string().url(),
  method: WebhookMethodSchema,
  events: z.array(WebhookEventSchema).min(1).max(50),
  status: WebhookStatusSchema,
  headers: z.record(z.string(), z.string()).optional(),
  secret: z.string().max(500).optional(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastTriggeredAt: z.string().datetime().optional(),
});

export const WebhookDeliverySchema = z.object({
  id: z.string().min(1),
  webhookId: z.string().min(1),
  event: WebhookEventSchema,
  status: WebhookDeliveryStatusSchema,
  requestBody: z.record(z.string(), z.unknown()),
  responseStatus: z.number().int().min(100).max(599).optional(),
  responseBody: z.string().max(10000).optional(),
  durationMs: z.number().int().nonnegative().optional(),
  attemptCount: z.number().int().nonnegative(),
  nextRetryAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  error: z.string().max(1000).optional(),
  createdAt: z.string().datetime(),
});

export type WebhookMethodSchemaType = z.infer<typeof WebhookMethodSchema>;
export type WebhookStatusSchemaType = z.infer<typeof WebhookStatusSchema>;
export type WebhookDeliveryStatusSchemaType = z.infer<typeof WebhookDeliveryStatusSchema>;
export type WebhookEventSchemaType = z.infer<typeof WebhookEventSchema>;
export type WebhookSchemaType = z.infer<typeof WebhookSchema>;
export type WebhookDeliverySchemaType = z.infer<typeof WebhookDeliverySchema>;
