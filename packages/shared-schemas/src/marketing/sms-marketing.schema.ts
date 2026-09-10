import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SMS_MARKETING } from '@vubon/shared-constants/src/marketing/sms-marketing.constants';

const smsMarketingStatusKeys = Object.keys(SMS_MARKETING.STATUS) as [string, ...string[]];
const smsMarketingTypeKeys = Object.keys(SMS_MARKETING.SMS_TYPES) as [string, ...string[]];

export const SmsMarketingSchema = BaseSchema.extend({
  smsId: z.string().uuid(),
  body: z.string().min(1).max(160),
  status: z.enum(smsMarketingStatusKeys),
  type: z.enum(smsMarketingTypeKeys),
  from: z.string(),
  to: z.array(z.string()),
  recipientCount: z.number().int().min(0).default(0),
  sentAt: z.date().optional(),
  scheduledAt: z.date().optional(),
  deliveredCount: z.number().int().min(0).default(0),
  failedCount: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
