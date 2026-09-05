/**
 * Bundle Deal Schema
 * বান্ডেল ডিল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { BUNDLE_DEAL } from '@vubon/shared-constants';

const BundleProductSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1),
  price: z.number().min(0),
});

export const BundleDealSchema = BaseSchema.extend({
  dealId: z.string().uuid(),
  products: z.array(BundleProductSchema).min(1, 'At least one product is required'),
  totalPrice: z.number().min(0, 'Total price must be greater than or equal to 0'),
  bundlePrice: z.number().min(0, 'Bundle price must be greater than or equal to 0'),
  savings: z.number().min(0, 'Savings must be greater than or equal to 0'),
  savingsPercentage: z.number().min(0).max(100),
  minItems: z.number().int().min(1).default(2),
  maxItems: z.number().int().min(1).default(10),
  status: z.enum([
    BUNDLE_DEAL.STATUS.ACTIVE,
    BUNDLE_DEAL.STATUS.INACTIVE,
    BUNDLE_DEAL.STATUS.EXPIRED,
    BUNDLE_DEAL.STATUS.SOLD_OUT,
    BUNDLE_DEAL.STATUS.CANCELLED,
    BUNDLE_DEAL.STATUS.PENDING,
  ]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const BundleDealCreateSchema = BundleDealSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const BundleDealUpdateSchema = BundleDealCreateSchema.partial();

export type BundleDeal = z.infer<typeof BundleDealSchema>;
export type BundleDealCreate = z.infer<typeof BundleDealCreateSchema>;
export type BundleDealUpdate = z.infer<typeof BundleDealUpdateSchema>;
