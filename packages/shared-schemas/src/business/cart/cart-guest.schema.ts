import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CART_GUEST } from '@vubon/shared-constants/src/business/cart/cart-guest.constants';

const cartGuestStatusKeys = Object.keys(CART_GUEST.STATUS) as [string, ...string[]];

export const CartGuestSchema = BaseSchema.extend({
  guestId: z.string().uuid(),
  cartId: z.string().uuid(),
  status: z.enum(cartGuestStatusKeys),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  deviceId: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  sessionId: z.string(),
  expiresAt: z.date(),
  convertedToUserId: z.string().uuid().optional(),
  convertedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
