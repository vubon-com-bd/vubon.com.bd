/**
 * Product Deal Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/product-deal.constants থেকে।
 */

import { z } from 'zod';
import { PRODUCT_DEAL_STATUS } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { DealDiscountTypeSchema } from './deal-discount-type.schema';

export const ProductDealStatusSchema = z.enum(
  Object.values(PRODUCT_DEAL_STATUS) as [string, ...string[]]
);

export const ProductDealSchema = z.object({
  id: UuidSchema,
  dealId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  status: ProductDealStatusSchema,
  discountType: DealDiscountTypeSchema,
  discountValue: z.number().positive(),
  originalPrice: PositiveMoneySchema,
  dealPrice: PositiveMoneySchema,
  currency: z.string().length(3),
  minQuantity: z.number().int().min(1).max(100),
  maxQuantity: z.number().int().positive().max(100).optional(),
  perUserLimit: z.number().int().positive().max(100),
  totalQuantityLimit: z.number().int().positive().optional(),
  soldQuantity: z.number().int().nonnegative(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
});

export const ProductDealPublicSchema = ProductDealSchema.pick({
  productId: true,
  variantId: true,
  originalPrice: true,
  dealPrice: true,
  currency: true,
}).extend({
  discountPercent: z.number().min(0).max(100),
  remaining: z.number().int().nonnegative(),
});

export type ProductDealStatusSchemaType = z.infer<typeof ProductDealStatusSchema>;
export type ProductDealSchemaType = z.infer<typeof ProductDealSchema>;
export type ProductDealPublicSchemaType = z.infer<typeof ProductDealPublicSchema>;
