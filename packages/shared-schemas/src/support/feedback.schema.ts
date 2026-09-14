/**
 * Feedback Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/feedback.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { FEEDBACK_TYPE, FEEDBACK_STATUS, FEEDBACK_RATING } from '@vubon/shared-constants/support';

export const FeedbackTypeSchema = z.enum(Object.values(FEEDBACK_TYPE) as [string, ...string[]]);

export const FeedbackStatusSchema = z.enum(Object.values(FEEDBACK_STATUS) as [string, ...string[]]);

export const FeedbackSchema = BaseEntitySchema.extend({
  type: FeedbackTypeSchema,
  status: FeedbackStatusSchema,
  title: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
  rating: z.number().int().min(FEEDBACK_RATING.MIN).max(FEEDBACK_RATING.MAX).optional(),
  attachments: z.array(z.string().url()).max(5).optional(),
  userId: UuidSchema.optional(),
  email: EmailSchema.optional(),
  isAnonymous: z.boolean(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  referenceId: z.string().max(100).optional(),
  referenceType: z.string().max(50).optional(),
  reviewedBy: UuidSchema.optional(),
  reviewedAt: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
});

export const FeedbackPublicSchema = FeedbackSchema.pick({
  id: true,
  type: true,
  status: true,
  title: true,
  message: true,
  rating: true,
  isAnonymous: true,
  createdAt: true,
});

export const FeedbackCreateInputSchema = z
  .object({
    type: FeedbackTypeSchema,
    title: z.string().max(200).optional(),
    message: z.string().trim().min(10).max(5000),
    rating: z.number().int().min(FEEDBACK_RATING.MIN).max(FEEDBACK_RATING.MAX).optional(),
    attachments: z.array(z.string().url()).max(5).optional(),
    isAnonymous: z.boolean().optional(),
    referenceId: z.string().max(100).optional(),
    referenceType: z.string().max(50).optional(),
  })
  .strict();

export const FeedbackListFilterSchema = z.object({
  type: FeedbackTypeSchema.optional(),
  status: FeedbackStatusSchema.optional(),
  minRating: z.number().int().min(1).max(5).optional(),
  maxRating: z.number().int().min(1).max(5).optional(),
  isAnonymous: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type FeedbackTypeSchemaType = z.infer<typeof FeedbackTypeSchema>;
export type FeedbackStatusSchemaType = z.infer<typeof FeedbackStatusSchema>;
export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
export type FeedbackPublicSchemaType = z.infer<typeof FeedbackPublicSchema>;
export type FeedbackCreateInputSchemaType = z.infer<typeof FeedbackCreateInputSchema>;
export type FeedbackListFilterSchemaType = z.infer<typeof FeedbackListFilterSchema>;
