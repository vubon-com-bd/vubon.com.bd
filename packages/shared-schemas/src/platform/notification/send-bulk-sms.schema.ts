/**
 * Send Bulk SMS Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { SmsTypeSchema } from './sms.schema.js';

export const SendBulkSmsRequestSchema = z
  .object({
    recipients: z
      .array(
        z.object({
          phone: PhoneSchema,
          message: z.string().trim().min(1).max(1600).optional(),
        }).strict(),
      )
      .min(1)
      .max(1000),
    message: z.string().trim().min(1).max(1600).optional(),
    type: SmsTypeSchema,
    senderId: z.string().max(11).optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict()
  .refine((data) => Boolean(data.message || data.recipients.every((r) => r.message)), {
    message: 'Either top-level message or per-recipient message is required',
  });

export type SendBulkSmsRequestSchemaType = z.infer<typeof SendBulkSmsRequestSchema>;
