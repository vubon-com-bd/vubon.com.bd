/**
 * Send SMS Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { SmsTypeSchema } from './sms.schema.js';

export const SendSmsRequestSchema = z
  .object({
    to: z.union([PhoneSchema, z.array(PhoneSchema).min(1).max(1000)]),
    message: z.string().trim().min(1).max(1600),
    type: SmsTypeSchema,
    senderId: z.string().max(11).optional(),
    scheduledAt: z.string().datetime().optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendSmsRequestSchemaType = z.infer<typeof SendSmsRequestSchema>;
