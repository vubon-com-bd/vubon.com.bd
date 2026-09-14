/**
 * SMS Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/sms.constants থেকে।
 */

import { z } from 'zod';
import { SMS_PROVIDER, SMS_STATUS, SMS_TYPE } from '@vubon/shared-constants/platform';
import { PhoneSchema } from '../../common/primitives/phone.schema';

export const SmsProviderSchema = z.enum(Object.values(SMS_PROVIDER) as [string, ...string[]]);

export const SmsStatusSchema = z.enum(Object.values(SMS_STATUS) as [string, ...string[]]);

export const SmsTypeSchema = z.enum(Object.values(SMS_TYPE) as [string, ...string[]]);

export const SmsMessageSchema = z.object({
  id: z.string().min(1),
  to: PhoneSchema,
  from: z.string().max(20).optional(),
  message: z.string().min(1).max(1600),
  type: SmsTypeSchema,
  provider: SmsProviderSchema.optional(),
  status: SmsStatusSchema,
  segments: z.number().int().positive().max(10),
  encoding: z.enum(['gsm', 'unicode']),
  sentAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  failureReason: z.string().max(500).optional(),
  cost: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type SmsProviderSchemaType = z.infer<typeof SmsProviderSchema>;
export type SmsStatusSchemaType = z.infer<typeof SmsStatusSchema>;
export type SmsTypeSchemaType = z.infer<typeof SmsTypeSchema>;
export type SmsMessageSchemaType = z.infer<typeof SmsMessageSchema>;
