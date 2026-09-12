import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { PRICING } from '@vubon/shared-constants/src/business/product/pricing.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

const pricingTypeKeys = Object.keys(PRICING.TYPES) as [string, ...string[]];
const currencyKeys = Object.keys(CURRENCY) as [string, ...string[]];

export const PricingSchema = BaseSchema.extend({
  pricingId: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  type: z.enum(pricingTypeKeys),
  price: MoneySchema,
  compareAtPrice: MoneySchema.optional(),
  cost: MoneySchema.optional(),
  currency: z.enum(currencyKeys),
  discount: z
    .object({
      type: z.enum(['percentage', 'fixed', 'tiered']),
      value: z.number().min(0).max(100),
      minQuantity: z.number().int().min(1).optional(),
      maxQuantity: z.number().int().min(1).optional(),
    })
    .optional(),
  tax: z
    .object({
      type: z.string(),
      rate: z.number().min(0).max(100),
      isInclusive: z.boolean().default(false),
    })
    .optional(),
  isOnSale: z.boolean().default(false),
  salePrice: MoneySchema.optional(),
  saleStartAt: z.date().optional(),
  saleEndAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const PricingCreateSchema = PricingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
