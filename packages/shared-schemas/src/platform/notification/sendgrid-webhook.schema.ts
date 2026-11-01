/**
 * SendGrid Webhook Event Schema
 * @module shared-schemas/platform/notification
 *
 * SendGrid event webhook payload — batch events।
 */
import { z } from 'zod';
import { EmailSchema } from '../../common/primitives/email.schema.js';

export const SendgridEventSchema = z
  .object({
    email: EmailSchema,
    timestamp: z.number().int().nonnegative(),
    event: z.enum([
      'processed', 'delivered', 'open', 'click', 'bounce',
      'dropped', 'spamreport', 'unsubscribe', 'group_unsubscribe', 'group_resubscribe',
    ]),
    sg_event_id: z.string(),
    sg_message_id: z.string(),
    'smtp-id': z.string().optional(),
    category: z.union([z.string(), z.array(z.string())]).optional(),
    reason: z.string().optional(),
    url: z.string().url().optional(),
    useragent: z.string().optional(),
    ip: z.string().optional(),
  })
  .passthrough();

export const SendgridWebhookRequestSchema = z.array(SendgridEventSchema).min(1).max(1000);

export type SendgridEventSchemaType = z.infer<typeof SendgridEventSchema>;
export type SendgridWebhookRequestSchemaType = z.infer<typeof SendgridWebhookRequestSchema>;
