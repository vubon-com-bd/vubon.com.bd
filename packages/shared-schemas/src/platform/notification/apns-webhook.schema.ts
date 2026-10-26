/**
 * APNs Webhook Event Schema
 * @module shared-schemas/platform/notification
 *
 * Apple Push Notification service feedback।
 */
import { z } from 'zod';

export const ApnsDeliveryStateSchema = z.enum([
  'delivered', 'failed', 'bounced', 'unregistered',
]);

export const ApnsWebhookRequestSchema = z
  .object({
    apnsId: z.string().min(1),
    deviceToken: z.string().min(1),
    state: ApnsDeliveryStateSchema,
    statusCode: z.number().int().min(100).max(599).optional(),
    reason: z.string().optional(),
    timestamp: z.number().int().nonnegative(),
  })
  .passthrough();

export type ApnsDeliveryStateSchemaType = z.infer<typeof ApnsDeliveryStateSchema>;
export type ApnsWebhookRequestSchemaType = z.infer<typeof ApnsWebhookRequestSchema>;
