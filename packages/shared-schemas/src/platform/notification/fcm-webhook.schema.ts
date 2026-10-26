/**
 * FCM Webhook Event Schema
 * @module shared-schemas/platform/notification
 *
 * Firebase Cloud Messaging delivery feedback।
 */
import { z } from 'zod';

export const FcmDeliveryStateSchema = z.enum([
  'MessageSent', 'MessageDelivered', 'MessageFailed', 'MessageOpened', 'MessageClicked',
]);

export const FcmWebhookRequestSchema = z
  .object({
    messageId: z.string().min(1),
    token: z.string().optional(),
    topic: z.string().optional(),
    state: FcmDeliveryStateSchema,
    errorCode: z.string().optional(),
    errorMessage: z.string().optional(),
    deliveredAt: z.string().datetime().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export type FcmDeliveryStateSchemaType = z.infer<typeof FcmDeliveryStateSchema>;
export type FcmWebhookRequestSchemaType = z.infer<typeof FcmWebhookRequestSchema>;
