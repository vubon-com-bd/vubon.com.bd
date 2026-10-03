/**
 * SMS Marketing Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/sms-marketing.constants থেকে।
 */

import { z } from 'zod';
import {
  SMS_MARKETING_TYPE,
  SMS_MARKETING_STATUS,
  SMS_MARKETING,
} from '@vubon/shared-constants/marketing';

export const SmsMarketingTypeSchema = z.enum(
  Object.values(SMS_MARKETING_TYPE) as [string, ...string[]]
);

export const SmsMarketingStatusSchema = z.enum(
  Object.values(SMS_MARKETING_STATUS) as [string, ...string[]]
);

export const SmsMarketingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: SmsMarketingTypeSchema,
  status: SmsMarketingStatusSchema,
  message: z
    .string()
    .min(1)
    .max(SMS_MARKETING.MAX_LENGTH * 5),
  senderId: z.string().max(SMS_MARKETING.SENDER_ID_MAX_LENGTH).optional(),
  recipientCount: z.number().int().nonnegative(),
  sentCount: z.number().int().nonnegative(),
  deliveredCount: z.number().int().nonnegative(),
  failedCount: z.number().int().nonnegative(),
  segments: z.number().int().nonnegative(),
  scheduledAt: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const SmsMarketingPublicSchema = SmsMarketingSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  recipientCount: true,
  sentAt: true,
});

export const SmsMarketingStatsSchema = z.object({
  campaignId: z.string().min(1),
  sent: z.number().int().nonnegative(),
  delivered: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  deliveryRate: z.number().min(0).max(1),
});

export type SmsMarketingTypeSchemaType = z.infer<typeof SmsMarketingTypeSchema>;
export type SmsMarketingStatusSchemaType = z.infer<typeof SmsMarketingStatusSchema>;
export type SmsMarketingSchemaType = z.infer<typeof SmsMarketingSchema>;
export type SmsMarketingPublicSchemaType = z.infer<typeof SmsMarketingPublicSchema>;
export type SmsMarketingStatsSchemaType = z.infer<typeof SmsMarketingStatsSchema>;
