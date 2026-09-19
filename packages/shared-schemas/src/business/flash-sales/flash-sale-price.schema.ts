/**
 * Flash Sale Price Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-price.constants থেকে।
 */

import { z } from 'zod';
import { FLASH_SALE_PRICE_TYPE, FLASH_SALE_PRICE } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';

export const FlashSalePriceTypeSchema = z.enum(
  Object.values(FLASH_SALE_PRICE_TYPE) as [string, ...string[]]
);

export const FlashSalePriceTierSchema = z.object({
  minQuantity: z.number().int().positive().max(1000),
  maxQuantity: z.number().int().positive().max(1000).optional(),
  unitPrice: PositiveMoneySchema,
  discountPercent: z
    .number()
    .min(FLASH_SALE_PRICE.MIN_DISCOUNT_PERCENT)
    .max(FLASH_SALE_PRICE.MAX_DISCOUNT_PERCENT),
});

export const FlashSalePriceSchema = z.object({
  id: UuidSchema,
  flashSaleId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  type: FlashSalePriceTypeSchema,
  originalPrice: PositiveMoneySchema,
  salePrice: PositiveMoneySchema,
  discountAmount: PositiveMoneySchema,
  discountPercent: z
    .number()
    .min(FLASH_SALE_PRICE.MIN_DISCOUNT_PERCENT)
    .max(FLASH_SALE_PRICE.MAX_DISCOUNT_PERCENT),
  currency: z.string().length(3),
  maxQuantity: z.number().int().positive().max(1000).optional(),
  minQuantity: z.number().int().positive().max(1000).optional(),
  tierPrices: z.array(FlashSalePriceTierSchema).max(10).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const FlashSalePricePublicSchema = FlashSalePriceSchema.pick({
  productId: true,
  variantId: true,
  originalPrice: true,
  salePrice: true,
  discountPercent: true,
  currency: true,
});

export type FlashSalePriceTypeSchemaType = z.infer<typeof FlashSalePriceTypeSchema>;
export type FlashSalePriceTierSchemaType = z.infer<typeof FlashSalePriceTierSchema>;
export type FlashSalePriceSchemaType = z.infer<typeof FlashSalePriceSchema>;
export type FlashSalePricePublicSchemaType = z.infer<typeof FlashSalePricePublicSchema>;
