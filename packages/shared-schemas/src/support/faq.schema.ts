import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SUPPORT_FAQ } from '@vubon/shared-constants/src/support/faq.constants';
import { FAQ_CATEGORY } from '@vubon/shared-constants/src/content/faq-category.constants';

const faqStatusKeys = Object.keys(SUPPORT_FAQ.STATUS) as [string, ...string[]];
const faqTypeKeys = Object.keys(SUPPORT_FAQ.FAQ_TYPES) as [string, ...string[]];
const faqCategoryKeys = Object.keys(FAQ_CATEGORY.TYPES) as [string, ...string[]];

export const SupportFaqSchema = BaseSchema.extend({
  faqId: z.string().uuid(),
  question: z.string().min(1).max(SUPPORT_FAQ.MAX_QUESTION_LENGTH),
  answer: z.string().min(SUPPORT_FAQ.MIN_ANSWER_LENGTH).max(SUPPORT_FAQ.MAX_ANSWER_LENGTH),
  status: z.enum(faqStatusKeys),
  type: z.enum(faqTypeKeys),
  category: z.enum(faqCategoryKeys),
  order: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  helpfulCount: z.number().int().min(0).default(0),
  notHelpfulCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
