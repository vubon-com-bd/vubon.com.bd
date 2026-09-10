import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { VENDOR_REVIEW } from '@vubon/shared-constants/src/business/vendor/vendor-review.constants';

const vendorReviewStatusKeys = Object.keys(VENDOR_REVIEW.STATUS) as [string, ...string[]];
const vendorReviewTypeKeys = Object.keys(VENDOR_REVIEW.REVIEW_TYPES) as [string, ...string[]];

export const VendorReviewSchema = BaseSchema.extend({
  reviewId: z.string().uuid(),
  vendorId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
  status: z.enum(vendorReviewStatusKeys),
  type: z.enum(vendorReviewTypeKeys),
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
