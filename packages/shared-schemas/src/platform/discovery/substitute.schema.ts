import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { SUBSTITUTE } from '@vubon/shared-constants/src/platform/discovery/substitute.constants';

const substituteTypeKeys = Object.keys(SUBSTITUTE.TYPES) as [string, ...string[]];

export const SubstituteSchema = BaseSchema.extend({
  substituteId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(substituteTypeKeys),
  substituteProducts: z.array(z.string()),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
