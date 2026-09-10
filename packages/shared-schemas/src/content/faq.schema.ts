import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { FaqCategorySchema } from './faq-category.schema';
import { FAQ_STATUS } from '@vubon/shared-constants/src/content/faq-status.constants';

const faqStatusKeys = Object.keys(FAQ_STATUS) as [string, ...string[]];

export const FaqSchema = BaseSchema.extend({
  faqId: z.string().uuid(),
  question: z.string().min(1).max(200),
  answer: z.string().min(10).max(2000),
  status: z.enum(faqStatusKeys),
  category: FaqCategorySchema,
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  viewCount: z.number().int().min(0).default(0),
  helpfulCount: z.number().int().min(0).default(0),
  notHelpfulCount: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
