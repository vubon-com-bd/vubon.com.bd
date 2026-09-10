import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { COMPLEMENTARY } from '@vubon/shared-constants/src/platform/discovery/complementary.constants';

const complementaryTypeKeys = Object.keys(COMPLEMENTARY.TYPES) as [string, ...string[]];

export const ComplementarySchema = BaseSchema.extend({
  complementaryId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(complementaryTypeKeys),
  complementaryProducts: z.array(z.string()),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
