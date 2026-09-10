import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { UPSELLING } from '@vubon/shared-constants/src/platform/discovery/upselling.constants';

const upsellingTypeKeys = Object.keys(UPSELLING.TYPES) as [string, ...string[]];

export const UpsellingSchema = BaseSchema.extend({
  upsellingId: z.string().uuid(),
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(upsellingTypeKeys),
  upsellProducts: z.array(z.string()),
  score: z.number().min(0).max(1),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
