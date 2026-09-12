import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { FREQUENTLY_BOUGHT } from '@vubon/shared-constants/src/platform/discovery/frequently-bought.constants';

const frequentlyBoughtTypeKeys = Object.keys(FREQUENTLY_BOUGHT.TYPES) as [string, ...string[]];

export const FrequentlyBoughtSchema = BaseSchema.extend({
  frequentlyBoughtId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(frequentlyBoughtTypeKeys),
  association: z.array(z.string()),
  support: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  lift: z.number().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
