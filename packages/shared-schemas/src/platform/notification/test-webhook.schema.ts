/**
 * Test Webhook Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { WebhookEventSchema } from './webhook.schema.js';

export const TestWebhookRequestSchema = z
  .object({
    webhookId: UuidSchema,
    event: WebhookEventSchema,
    payload: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export type TestWebhookRequestSchemaType = z.infer<typeof TestWebhookRequestSchema>;
