/**
 * Twilio Webhook Event Schema
 * @module shared-schemas/platform/notification
 *
 * Twilio SMS status callback payload।
 */
import { z } from 'zod';

export const TwilioSmsStatusSchema = z.enum([
  'queued', 'failed', 'sent', 'delivered', 'undelivered', 'receiving', 'received', 'accepted',
]);

export const TwilioWebhookRequestSchema = z
  .object({
    MessageSid: z.string().min(1),
    AccountSid: z.string().min(1),
    From: z.string().min(1),
    To: z.string().min(1),
    Body: z.string().optional(),
    Status: TwilioSmsStatusSchema.optional(),
    ErrorCode: z.string().optional(),
    ErrorMessage: z.string().optional(),
    NumSegments: z.string().optional(),
    ApiVersion: z.string().optional(),
  })
  .passthrough();

export type TwilioSmsStatusSchemaType = z.infer<typeof TwilioSmsStatusSchema>;
export type TwilioWebhookRequestSchemaType = z.infer<typeof TwilioWebhookRequestSchema>;
