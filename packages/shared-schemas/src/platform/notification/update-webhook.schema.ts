/**
 * Update Webhook Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UrlSchema } from '../../common/primitives/url.schema.js';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { WebhookEventSchema, WebhookStatusSchema } from './webhook.schema.js';

export const UpdateWebhookRequestSchema = z
  .object({
    webhookId: UuidSchema,
    name: z.string().trim().min(1).max(150).optional(),
    url: UrlSchema.optional(),
    events: z.array(WebhookEventSchema).min(1).max(50).optional(),
    headers: z.record(z.string(), z.string()).optional(),
    secret: z.string().min(16).max(256).optional(),
    status: WebhookStatusSchema.optional(),
  })
  .strict()
  .refine((d) => Object.keys(d).length > 1, {
    message: 'At least one field to update is required',
  });

export type UpdateWebhookRequestSchemaType = z.infer<typeof UpdateWebhookRequestSchema>;
