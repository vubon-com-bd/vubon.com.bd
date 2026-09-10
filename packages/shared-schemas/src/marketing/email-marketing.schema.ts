import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { EMAIL_MARKETING } from '@vubon/shared-constants/src/marketing/email-marketing.constants';

const emailMarketingStatusKeys = Object.keys(EMAIL_MARKETING.STATUS) as [string, ...string[]];
const emailMarketingTypeKeys = Object.keys(EMAIL_MARKETING.EMAIL_TYPES) as [string, ...string[]];

export const EmailMarketingSchema = BaseSchema.extend({
  emailId: z.string().uuid(),
  subject: z.string().min(1).max(100),
  content: z.string().min(1).max(10000),
  status: z.enum(emailMarketingStatusKeys),
  type: z.enum(emailMarketingTypeKeys),
  createdBy: z.string().uuid(),
  createdByUser: UserSchema,
  recipients: z.array(z.string().email()),
  recipientCount: z.number().int().min(0).default(0),
  sentAt: z.date().optional(),
  scheduledAt: z.date().optional(),
  openRate: z.number().min(0).max(100).default(0),
  clickRate: z.number().min(0).max(100).default(0),
  bounceRate: z.number().min(0).max(100).default(0),
  unsubscribeRate: z.number().min(0).max(100).default(0),
  metadata: z.record(z.unknown()).optional(),
});
