import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../product/product.schema';
import { VariantSchema } from '../product/variant.schema';
import { PRODUCT_DEAL } from '@vubon/shared-constants/src/business/flash-sales/product-deal.constants';

const productDealStatusKeys = Object.keys(PRODUCT_DEAL.STATUS) as [string, ...string[]];

export const ProductDealSchema = BaseSchema.extend({
  productDealId: z.string().uuid(),
  dealId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  variantId: z.string().uuid().optional(),
  variant: VariantSchema.optional(),
  status: z.enum(productDealStatusKeys),
  originalPrice: MoneySchema,
  dealPrice: MoneySchema,
  discountAmount: MoneySchema,
  discountPercentage: z.number().min(0).max(100),
  minQuantity: z.number().int().min(1),
  maxQuantity: z.number().int().min(1),
  availableQuantity: z.number().int().min(0),
  soldQuantity: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isSoldOut: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
