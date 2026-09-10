import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';

const smsStatusKeys = Object.keys(SMS.STATUS) as [string, ...string[]];
const smsTypeKeys = Object.keys(SMS.TYPES) as [string, ...string[]];
const smsProviderKeys = Object.keys(SMS.SMS_PROVIDERS) as [string, ...string[]];

export const SmsSchema = BaseSchema.extend({
  smsId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(smsStatusKeys),
  type: z.enum(smsTypeKeys),
  provider: z.enum(smsProviderKeys),
  from: z.string(),
  to: z.array(z.string()),
  body: z.string().min(1).max(160),
  length: z.number().int().min(0),
  parts: z.number().int().min(1),
  sentAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureReason: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
