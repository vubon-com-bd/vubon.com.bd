/**
 * Product Deal Schema
 * প্রোডাক্ট ডিল সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PRODUCT_DEAL } from '@vubon/shared-constants';

export const ProductDealSchema = BaseSchema.extend({
  productId: z.string().uuid(),
  dealId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  discount: z.number().min(0, 'Discount must be greater than or equal to 0'),
  discountPercentage: z.number().min(0).max(100),
  flashPrice: z.number().min(0, 'Flash price must be greater than or equal to 0'),
  originalPrice: z.number().min(0, 'Original price must be greater than or equal to 0'),
  quantity: z.number().int().min(0).default(0),
  sold: z.number().int().min(0).default(0),
  minPurchase: z.number().int().min(1).default(1),
  maxPurchase: z.number().int().min(1).default(10),
  status: z.enum([
    PRODUCT_DEAL.STATUS.ACTIVE,
    PRODUCT_DEAL.STATUS.INACTIVE,
    PRODUCT_DEAL.STATUS.EXPIRED,
    PRODUCT_DEAL.STATUS.SOLD_OUT,
    PRODUCT_DEAL.STATUS.CANCELLED,
    PRODUCT_DEAL.STATUS.PENDING,
  ]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const ProductDealCreateSchema = ProductDealSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  sold: true,
});

export const ProductDealUpdateSchema = ProductDealCreateSchema.partial();

export type ProductDeal = z.infer<typeof ProductDealSchema>;
export type ProductDealCreate = z.infer<typeof ProductDealCreateSchema>;
export type ProductDealUpdate = z.infer<typeof ProductDealUpdateSchema>;
