import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { PRODUCT_REVIEW } from '@vubon/shared-constants/src/business/product/product-review.constants';

const ratingKeys = Object.keys(RATING) as [string, ...string[]];
const reviewStatusKeys = Object.keys(PRODUCT_REVIEW.STATUS) as [string, ...string[]];

export const ReviewSchema = BaseSchema.extend({
  reviewId: z.string().uuid(),
  productId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  rating: z.enum(ratingKeys),
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
  status: z.enum(reviewStatusKeys),
  images: z.array(z.string().url()),
  video: z.string().url().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
  isVerifiedPurchase: z.boolean().default(false),
  isHelpful: z.boolean().default(false),
  helpfulCount: z.number().int().min(0).default(0),
  notHelpfulCount: z.number().int().min(0).default(0),
  reportedCount: z.number().int().min(0).default(0),
  repliedAt: z.date().optional(),
  replyContent: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const ReviewCreateSchema = ReviewSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  helpfulCount: true,
  notHelpfulCount: true,
  reportedCount: true,
});

export type Review = z.infer<typeof ReviewSchema>;
export type ReviewCreate = z.infer<typeof ReviewCreateSchema>;
