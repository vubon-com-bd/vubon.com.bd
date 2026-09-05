/**
 * Vendor Rating Schema
 * ভেন্ডর রেটিং সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_RATING } from '@vubon/shared-constants';

const RatingDistributionSchema = z.object({
  1: z.number().int().min(0).default(0),
  2: z.number().int().min(0).default(0),
  3: z.number().int().min(0).default(0),
  4: z.number().int().min(0).default(0),
  5: z.number().int().min(0).default(0),
});

export const VendorRatingSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  type: z.enum(Object.values(VENDOR_RATING.TYPES) as [string, ...string[]]),
  value: z.number().min(0).max(5).default(0),
  count: z.number().int().min(0).default(0),
  average: z.number().min(0).max(5).default(0),
  distribution: RatingDistributionSchema.default({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }),
  period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  date: z.date(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorRatingCreateSchema = VendorRatingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorRatingUpdateSchema = VendorRatingCreateSchema.partial();

export type VendorRating = z.infer<typeof VendorRatingSchema>;
export type VendorRatingCreate = z.infer<typeof VendorRatingCreateSchema>;
export type VendorRatingUpdate = z.infer<typeof VendorRatingUpdateSchema>;
