/**
 * Email Marketing Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/email-marketing.constants থেকে।
 */

import { z } from 'zod';
import {
  EMAIL_MARKETING_TYPE,
  EMAIL_MARKETING_STATUS,
  EMAIL_MARKETING,
} from '@vubon/shared-constants/marketing';
import { EmailSchema } from '../common/primitives/email.schema';

export const EmailMarketingTypeSchema = z.enum(
  Object.values(EMAIL_MARKETING_TYPE) as [string, ...string[]]
);

export const EmailMarketingStatusSchema = z.enum(
  Object.values(EMAIL_MARKETING_STATUS) as [string, ...string[]]
);

export const EmailMarketingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: EmailMarketingTypeSchema,
  status: EmailMarketingStatusSchema,
  subject: z.string().min(1).max(EMAIL_MARKETING.SUBJECT_MAX_LENGTH),
  preheader: z.string().max(EMAIL_MARKETING.PREHEADER_MAX_LENGTH).optional(),
  bodyHtml: z.string().max(EMAIL_MARKETING.BODY_MAX_LENGTH).optional(),
  bodyText: z.string().max(EMAIL_MARKETING.BODY_MAX_LENGTH).optional(),
  templateId: z.string().max(100).optional(),
  fromName: z.string().max(150).optional(),
  fromEmail: EmailSchema.optional(),
  replyTo: EmailSchema.optional(),
  recipientCount: z.number().int().nonnegative(),
  sentCount: z.number().int().nonnegative(),
  deliveredCount: z.number().int().nonnegative(),
  openCount: z.number().int().nonnegative(),
  clickCount: z.number().int().nonnegative(),
  bounceCount: z.number().int().nonnegative(),
  unsubscribeCount: z.number().int().nonnegative(),
  scheduledAt: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const EmailMarketingPublicSchema = EmailMarketingSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  subject: true,
  recipientCount: true,
  sentAt: true,
});

export const EmailMarketingStatsSchema = z.object({
  campaignId: z.string().min(1),
  sent: z.number().int().nonnegative(),
  delivered: z.number().int().nonnegative(),
  opened: z.number().int().nonnegative(),
  clicked: z.number().int().nonnegative(),
  bounced: z.number().int().nonnegative(),
  unsubscribed: z.number().int().nonnegative(),
  openRate: z.number().min(0).max(1),
  clickRate: z.number().min(0).max(1),
  bounceRate: z.number().min(0).max(1),
});

export type EmailMarketingTypeSchemaType = z.infer<typeof EmailMarketingTypeSchema>;
export type EmailMarketingStatusSchemaType = z.infer<typeof EmailMarketingStatusSchema>;
export type EmailMarketingSchemaType = z.infer<typeof EmailMarketingSchema>;
export type EmailMarketingPublicSchemaType = z.infer<typeof EmailMarketingPublicSchema>;
export type EmailMarketingStatsSchemaType = z.infer<typeof EmailMarketingStatsSchema>;
