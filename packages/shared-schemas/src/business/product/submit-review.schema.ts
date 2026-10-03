/**
 * Submit Review Request Schema
 * @module shared-schemas/business/product/requests
 */

import { z } from 'zod';
import { REVIEW_RATING, REVIEW } from '@vubon/shared-constants/business';

export const SubmitReviewRequestSchema = z
  .object({
    productId: z.string().min(1),
    rating: z.number().int().min(REVIEW_RATING.MIN).max(REVIEW_RATING.MAX),
    title: z.string().trim().max(REVIEW.TITLE_MAX_LENGTH).optional(),
    comment: z
      .string()
      .trim()
      .min(REVIEW.COMMENT_MIN_LENGTH)
      .max(REVIEW.COMMENT_MAX_LENGTH)
      .optional(),
    images: z.array(z.string().url()).max(REVIEW.MAX_IMAGES).optional(),
  })
  .strict();

export type SubmitReviewRequestSchemaType = z.infer<typeof SubmitReviewRequestSchema>;
