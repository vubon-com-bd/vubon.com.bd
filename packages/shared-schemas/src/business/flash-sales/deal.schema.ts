/**
 * Deal Core Schema
 * @module shared-schemas/business/flash-sales
 *
 * Deal entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { MoneySchema } from '../../common/primitives/money.schema';
import { DealStatusSchema } from './deal-status.schema';
import { DealDiscountTypeSchema } from './deal-discount-type.schema';

export const DealTypeSchema = z.enum(['product', 'bundle', 'category', 'brand', 'cart', 'order']);

export const DealSchema = BaseEntitySchema.extend({
  flashSaleId: z.string().min(1),
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: DealTypeSchema,
  status: DealStatusSchema,
  discountType: DealDiscountTypeSchema,
  discountValue: z.number().positive(),
  maxDiscountAmount: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  applicableProductIds: z.array(z.string()).max(1000).optional(),
  applicableCategoryIds: z.array(z.string()).max(100).optional(),
  applicableBrandIds: z.array(z.string()).max(100).optional(),
  excludedProductIds: z.array(z.string()).max(1000).optional(),
  perUserLimit: z.number().int().positive().max(100),
  totalQuantityLimit: z.number().int().positive().optional(),
  soldQuantity: z.number().int().nonnegative(),
  priority: z.number().int().min(1).max(100),
  isStackable: z.boolean(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
});

export const DealPublicSchema = DealSchema.pick({
  id: true,
  flashSaleId: true,
  name: true,
  type: true,
  discountType: true,
  discountValue: true,
  maxDiscountAmount: true,
  minOrderAmount: true,
  startAt: true,
  endAt: true,
});

export type DealTypeSchemaType = z.infer<typeof DealTypeSchema>;
export type DealSchemaType = z.infer<typeof DealSchema>;
export type DealPublicSchemaType = z.infer<typeof DealPublicSchema>;
