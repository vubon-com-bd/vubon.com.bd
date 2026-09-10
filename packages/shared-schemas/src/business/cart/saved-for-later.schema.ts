import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ProductSchema } from '../product/product.schema';
import { VariantSchema } from '../product/variant.schema';
import { SAVED_FOR_LATER } from '@vubon/shared-constants/src/business/cart/saved-for-later.constants';

const savedForLaterStatusKeys = Object.keys(SAVED_FOR_LATER.STATUS) as [string, ...string[]];
const savedForLaterTypeKeys = Object.keys(SAVED_FOR_LATER.TYPES) as [string, ...string[]];

export const SavedForLaterSchema = BaseSchema.extend({
  savedId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  productId: z.string().uuid(),
  product: ProductSchema,
  variantId: z.string().uuid().optional(),
  variant: VariantSchema.optional(),
  status: z.enum(savedForLaterStatusKeys),
  type: z.enum(savedForLaterTypeKeys),
  quantity: z.number().int().min(1),
  notes: z.string().optional(),
  savedAt: z.date(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
