import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { BUNDLE } from '@vubon/shared-constants/src/platform/discovery/bundle.constants';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';

const bundleTypeKeys = Object.keys(BUNDLE.TYPES) as [string, ...string[]];
const productStatusKeys = Object.keys(PRODUCT_STATUS) as [string, ...string[]];

export const BundleSchema = BaseSchema.extend({
  bundleId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  type: z.enum(bundleTypeKeys),
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
  discount: z.number().min(0),
  discountPercentage: z.number().min(0).max(100),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  status: z.enum(productStatusKeys),
  validUntil: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const BundleCreateSchema = BundleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
});
