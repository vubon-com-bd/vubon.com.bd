/**
 * Flash Sale Core Schema
 * @module shared-schemas/business/flash-sales
 *
 * Flash Sale entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { FlashSaleStatusSchema } from './flash-sale-status.schema';
import { FlashSaleTypeSchema } from './flash-sale-type.schema';
import { FlashSaleScheduleSchema } from './flash-sale-schedule.schema';
import { FlashSalePricePublicSchema } from './flash-sale-price.schema';
import { ProductDealPublicSchema } from './product-deal.schema';
import { BundleDealPublicSchema } from './bundle-deal.schema';

export const FlashSaleSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  slug: z.string().min(1).max(150),
  description: z.string().max(2000).optional(),
  type: FlashSaleTypeSchema,
  status: FlashSaleStatusSchema,
  schedule: FlashSaleScheduleSchema,
  bannerUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  theme: z.string().max(50).optional(),
  maxProducts: z.number().int().positive().max(100000),
  maxParticipants: z.number().int().positive().max(100000),
  minDiscountPercent: z.number().min(0).max(100),
  maxDiscountPercent: z.number().min(0).max(100),
  products: z.array(ProductDealPublicSchema).max(1000),
  bundles: z.array(BundleDealPublicSchema).max(100),
  prices: z.array(FlashSalePricePublicSchema).max(1000),
  participantCount: z.number().int().nonnegative(),
  productCount: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  createdBy: z.string().min(1),
});

export const FlashSalePublicSchema = FlashSaleSchema.pick({
  id: true,
  name: true,
  slug: true,
  type: true,
  status: true,
  bannerUrl: true,
  thumbnailUrl: true,
  theme: true,
  productCount: true,
  isFeatured: true,
}).extend({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
});

export const FlashSaleSummarySchema = FlashSaleSchema.pick({
  id: true,
  name: true,
  status: true,
  productCount: true,
}).extend({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  remainingSeconds: z.number().int().nonnegative(),
});

export const FlashSaleListFilterSchema = z.object({
  status: FlashSaleStatusSchema.optional(),
  type: FlashSaleTypeSchema.optional(),
  isFeatured: z.boolean().optional(),
  activeNow: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type FlashSaleSchemaType = z.infer<typeof FlashSaleSchema>;
export type FlashSalePublicSchemaType = z.infer<typeof FlashSalePublicSchema>;
export type FlashSaleSummarySchemaType = z.infer<typeof FlashSaleSummarySchema>;
export type FlashSaleListFilterSchemaType = z.infer<typeof FlashSaleListFilterSchema>;
