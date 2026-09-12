import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { NEWSLETTER_STATUS } from '@vubon/shared-constants/src/content/newsletter-status.constants';
import { NEWSLETTER } from '@vubon/shared-constants/src/content/newsletter.constants';

const newsletterStatusKeys = Object.keys(NEWSLETTER_STATUS) as [string, ...string[]];
const newsletterTypeKeys = Object.keys(NEWSLETTER.NEWSLETTER_TYPES) as [string, ...string[]];

export const NewsletterSchema = BaseSchema.extend({
  newsletterId: z.string().uuid(),
  subject: z.string().min(1).max(100),
  content: z.string().min(1).max(10000),
  status: z.enum(newsletterStatusKeys),
  type: z.enum(newsletterTypeKeys),
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
