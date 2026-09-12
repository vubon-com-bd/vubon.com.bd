import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { CART_MERGER } from '@vubon/shared-constants/src/business/cart/cart-merger.constants';

const cartMergerStatusKeys = Object.keys(CART_MERGER.STATUS) as [string, ...string[]];
const cartMergerTypeKeys = Object.keys(CART_MERGER.TYPES) as [string, ...string[]];
const cartMergerStrategyKeys = Object.keys(CART_MERGER.MERGE_STRATEGY) as [string, ...string[]];

export const CartMergerSchema = BaseSchema.extend({
  mergerId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  sourceCartId: z.string().uuid(),
  targetCartId: z.string().uuid(),
  status: z.enum(cartMergerStatusKeys),
  type: z.enum(cartMergerTypeKeys),
  strategy: z.enum(cartMergerStrategyKeys),
  mergedItems: z.array(
    z.object({
      itemId: z.string().uuid(),
      productId: z.string().uuid(),
      variantId: z.string().uuid().optional(),
      quantity: z.number().int().min(1),
      source: z.enum(['source', 'target']),
    })
  ),
  conflicts: z.array(
    z.object({
      itemId: z.string().uuid(),
      field: z.string(),
      sourceValue: z.unknown(),
      targetValue: z.unknown(),
      resolvedValue: z.unknown().optional(),
      resolvedBy: z.string().optional(),
    })
  ),
  mergedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
