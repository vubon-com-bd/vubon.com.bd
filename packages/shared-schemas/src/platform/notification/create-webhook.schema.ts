/**
 * Create Webhook Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UrlSchema } from '../../common/primitives/url.schema.js';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { WebhookEventSchema } from './webhook.schema.js';

export const CreateWebhookRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    url: UrlSchema,
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']).optional(),
    events: z.array(WebhookEventSchema).min(1).max(50),
    headers: z.record(z.string(), z.string()).optional(),
    secret: z.string().min(16).max(256).optional(),
    ownerId: UuidSchema.optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type CreateWebhookRequestSchemaType = z.infer<typeof CreateWebhookRequestSchema>;
