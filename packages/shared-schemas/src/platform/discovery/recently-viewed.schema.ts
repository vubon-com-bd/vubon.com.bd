import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ProductSchema } from '../../business/product/product.schema';
import { RECENTLY_VIEWED } from '@vubon/shared-constants/src/platform/discovery/recently-viewed.constants';

const recentlyViewedTypeKeys = Object.keys(RECENTLY_VIEWED.TYPES) as [string, ...string[]];

export const RecentlyViewedSchema = BaseSchema.extend({
  viewedId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  productId: z.string().uuid(),
  product: ProductSchema,
  type: z.enum(recentlyViewedTypeKeys),
  viewedAt: z.date(),
  duration: z.number().min(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
