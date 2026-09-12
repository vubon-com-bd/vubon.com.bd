import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../product/product.schema';
import { FLASH_SALE_PRICE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-price.constants';

const priceTypeKeys = Object.keys(FLASH_SALE_PRICE.PRICE_TYPES) as [string, ...string[]];

export const FlashSalePriceSchema = BaseSchema.extend({
  priceId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(priceTypeKeys),
  originalPrice: MoneySchema,
  flashPrice: MoneySchema,
  discountAmount: MoneySchema,
  discountPercentage: z.number().min(0).max(100),
  isActive: z.boolean().default(true),
  isValid: z.boolean().default(true),
  startsAt: z.date(),
  endsAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
