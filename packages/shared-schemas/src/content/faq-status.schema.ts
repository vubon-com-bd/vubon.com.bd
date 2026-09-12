import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { FAQ_STATUS } from '@vubon/shared-constants/src/content/faq-status.constants';

const faqStatusKeys = Object.keys(FAQ_STATUS) as [string, ...string[]];

export const FaqStatusSchema = StatusSchema.extend({
  status: z.enum(faqStatusKeys),
  category: z.literal('faq'),
  isDraft: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const FaqStatusEnumSchema = z.enum(faqStatusKeys);
