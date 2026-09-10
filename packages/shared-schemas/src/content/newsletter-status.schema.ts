import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { NEWSLETTER_STATUS } from '@vubon/shared-constants/src/content/newsletter-status.constants';

const newsletterStatusKeys = Object.keys(NEWSLETTER_STATUS) as [string, ...string[]];

export const NewsletterStatusSchema = StatusSchema.extend({
  status: z.enum(newsletterStatusKeys),
  category: z.literal('newsletter'),
  isDraft: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isSending: z.boolean().default(false),
  isSent: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
});

export const NewsletterStatusEnumSchema = z.enum(newsletterStatusKeys);
