import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { ProductSchema } from '../product/product.schema';
import { FLASH_SALE_WISHLIST } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-wishlist.constants';

const wishlistStatusKeys = Object.keys(FLASH_SALE_WISHLIST.STATUS) as [string, ...string[]];
const wishlistTypeKeys = Object.keys(FLASH_SALE_WISHLIST.WISHLIST_TYPES) as [string, ...string[]];

export const FlashSaleWishlistSchema = BaseSchema.extend({
  wishlistId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  productId: z.string().uuid(),
  product: ProductSchema,
  status: z.enum(wishlistStatusKeys),
  type: z.enum(wishlistTypeKeys),
  addedAt: z.date(),
  removedAt: z.date().optional(),
  notifiedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
