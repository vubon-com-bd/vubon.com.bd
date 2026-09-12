import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { CROSS_SELLING } from '@vubon/shared-constants/src/platform/discovery/cross-selling.constants';

const crossSellingTypeKeys = Object.keys(CROSS_SELLING.TYPES) as [string, ...string[]];

export const CrossSellingSchema = BaseSchema.extend({
  crossSellingId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(crossSellingTypeKeys),
  crossSellProducts: z.array(z.string()),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
