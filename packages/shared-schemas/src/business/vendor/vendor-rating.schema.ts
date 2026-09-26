/**
 * Vendor Rating Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-rating.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_RATING_CATEGORY } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const VendorRatingCategorySchema = z.enum(
  Object.values(VENDOR_RATING_CATEGORY) as [string, ...string[]]
);

export const VendorRatingCategoryValueSchema = z.object({
  category: VendorRatingCategorySchema,
  score: z.number().min(0).max(5),
  count: z.number().int().nonnegative(),
});

export const VendorRatingSchema = z.object({
  vendorId: UuidSchema,
  overall: z.number().min(0).max(5),
  totalReviews: z.number().int().nonnegative(),
  distribution: z.record(z.string(), z.number().int().nonnegative()),
  categories: z.array(VendorRatingCategoryValueSchema).max(20),
  recentWeight: z.number().nonnegative(),
  updatedAt: z.string().datetime(),
});

export const VendorRatingReviewSchema = z.object({
  id: UuidSchema,
  vendorId: UuidSchema,
  userId: UuidSchema,
  orderId: UuidSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
  categories: z.array(VendorRatingCategoryValueSchema).max(20).optional(),
  isVerifiedPurchase: z.boolean(),
  createdAt: z.string().datetime(),
});

export type VendorRatingCategorySchemaType = z.infer<typeof VendorRatingCategorySchema>;
export type VendorRatingSchemaType = z.infer<typeof VendorRatingSchema>;
export type VendorRatingReviewSchemaType = z.infer<typeof VendorRatingReviewSchema>;
