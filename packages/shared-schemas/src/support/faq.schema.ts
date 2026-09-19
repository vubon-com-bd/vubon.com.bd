/**
 * FAQ Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/faq.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { FAQ_STATUS, FAQ_CATEGORY, FAQ } from '@vubon/shared-constants/support';

export const FaqStatusSchema = z.enum(Object.values(FAQ_STATUS) as [string, ...string[]]);

export const FaqCategorySchema = z.enum(Object.values(FAQ_CATEGORY) as [string, ...string[]]);

export const FaqSchema = BaseEntitySchema.extend({
  question: z.string().trim().min(FAQ.QUESTION_MIN_LENGTH).max(FAQ.QUESTION_MAX_LENGTH),
  answer: z.string().trim().min(FAQ.ANSWER_MIN_LENGTH).max(FAQ.ANSWER_MAX_LENGTH),
  category: FaqCategorySchema,
  status: FaqStatusSchema,
  tags: z.array(z.string().max(50)).max(FAQ.MAX_TAGS).optional(),
  helpfulCount: z.number().int().nonnegative(),
  notHelpfulCount: z.number().int().nonnegative(),
  viewCount: z.number().int().nonnegative(),
  sortOrder: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  language: z.string().min(2).max(10).optional(),
  createdBy: z.string().min(1),
  updatedBy: z.string().optional(),
});

export const FaqPublicSchema = FaqSchema.pick({
  id: true,
  question: true,
  answer: true,
  category: true,
  helpfulCount: true,
  viewCount: true,
});

export const FaqListFilterSchema = z.object({
  status: FaqStatusSchema.optional(),
  category: FaqCategorySchema.optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  isFeatured: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type FaqStatusSchemaType = z.infer<typeof FaqStatusSchema>;
export type FaqCategorySchemaType = z.infer<typeof FaqCategorySchema>;
export type FaqSchemaType = z.infer<typeof FaqSchema>;
export type FaqPublicSchemaType = z.infer<typeof FaqPublicSchema>;
export type FaqListFilterSchemaType = z.infer<typeof FaqListFilterSchema>;
