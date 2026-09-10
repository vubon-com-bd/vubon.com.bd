import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SMS } from '@vubon/shared-constants/src/platform/notification/sms.constants';

const smsStatusKeys = Object.keys(SMS.STATUS) as [string, ...string[]];
const smsTypeKeys = Object.keys(SMS.TYPES) as [string, ...string[]];

export const SupportSmsSchema = BaseSchema.extend({
  smsId: z.string().uuid(),
  ticketId: z.string().uuid().optional(),
  to: z.string(),
  from: z.string(),
  body: z.string().min(1).max(160),
  status: z.enum(smsStatusKeys),
  type: z.enum(smsTypeKeys),
  sentBy: z.string().uuid(),
  sentAt: z.date(),
  deliveredAt: z.date().optional(),
  readAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
