/**
 * Review Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/review.constants থেকে।
 */

import { z } from 'zod';
import { REVIEW_STATUS, REVIEW_RATING, REVIEW } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const ReviewStatusSchema = z.enum(Object.values(REVIEW_STATUS) as [string, ...string[]]);

export const ReviewRatingSchema = z.number().int().min(REVIEW_RATING.MIN).max(REVIEW_RATING.MAX);

export const ReviewSchema = z.object({
  id: UuidSchema,
  productId: UuidSchema,
  userId: UuidSchema,
  orderId: UuidSchema.optional(),
  rating: ReviewRatingSchema,
  title: z.string().trim().max(REVIEW.TITLE_MAX_LENGTH).optional(),
  comment: z
    .string()
    .trim()
    .min(REVIEW.COMMENT_MIN_LENGTH)
    .max(REVIEW.COMMENT_MAX_LENGTH)
    .optional(),
  images: z.array(z.string().url()).max(REVIEW.MAX_IMAGES).optional(),
  status: ReviewStatusSchema,
  isVerifiedPurchase: z.boolean(),
  helpfulCount: z.number().int().nonnegative(),
  reportCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ReviewPublicSchema = ReviewSchema.pick({
  id: true,
  userId: true,
  rating: true,
  title: true,
  comment: true,
  images: true,
  isVerifiedPurchase: true,
  helpfulCount: true,
  createdAt: true,
}).extend({
  userName: z.string().max(150),
  userAvatar: z.string().url().optional(),
});

export const ReviewSummarySchema = z.object({
  productId: UuidSchema,
  averageRating: z.number().min(0).max(5),
  totalReviews: z.number().int().nonnegative(),
  ratingDistribution: z.record(z.string(), z.number().int().nonnegative()),
});

export type ReviewStatusSchemaType = z.infer<typeof ReviewStatusSchema>;
export type ReviewRatingSchemaType = z.infer<typeof ReviewRatingSchema>;
export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
export type ReviewPublicSchemaType = z.infer<typeof ReviewPublicSchema>;
export type ReviewSummarySchemaType = z.infer<typeof ReviewSummarySchema>;
