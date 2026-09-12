import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { FAQ_CATEGORY } from '@vubon/shared-constants/src/content/faq-category.constants';

const faqCategoryTypeKeys = Object.keys(FAQ_CATEGORY.TYPES) as [string, ...string[]];

export const FaqCategorySchema = BaseSchema.extend({
  categoryId: z.string().uuid(),
  name: z.enum(faqCategoryTypeKeys),
  description: z.string().optional(),
  order: z.number().int().min(0).default(0),
  faqCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
