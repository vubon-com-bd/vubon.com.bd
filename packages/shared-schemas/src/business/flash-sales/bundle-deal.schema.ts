import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../product/product.schema';
import { BUNDLE_DEAL } from '@vubon/shared-constants/src/business/flash-sales/bundle-deal.constants';

const bundleDealStatusKeys = Object.keys(BUNDLE_DEAL.STATUS) as [string, ...string[]];
const bundleDealTypeKeys = Object.keys(BUNDLE_DEAL.TYPES) as [string, ...string[]];

export const BundleDealSchema = BaseSchema.extend({
  bundleDealId: z.string().uuid(),
  dealId: z.string().uuid(),
  status: z.enum(bundleDealStatusKeys),
  type: z.enum(bundleDealTypeKeys),
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      product: ProductSchema,
      quantity: z.number().int().min(1),
      price: MoneySchema,
    })
  ),
  productCount: z.number().int().min(0).default(0),
  originalPrice: MoneySchema,
  bundlePrice: MoneySchema,
  discountAmount: MoneySchema,
  discountPercentage: z.number().min(0).max(100),
  minPurchaseAmount: MoneySchema.optional(),
  maxPurchaseAmount: MoneySchema.optional(),
  availableQuantity: z.number().int().min(0),
  soldQuantity: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isSoldOut: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
