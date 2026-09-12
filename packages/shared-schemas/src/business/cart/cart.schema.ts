import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { UserSchema } from '../../user/user.schema';
import { CartItemSchema } from './cart-item.schema';
import { CartCouponSchema } from './cart-coupon.schema';
import { CartGuestSchema } from './cart-guest.schema';
import { CART_STATUS } from '@vubon/shared-constants/src/business/cart/cart-status.constants';

const cartStatusKeys = Object.keys(CART_STATUS) as [string, ...string[]];

export const CartSchema = BaseSchema.extend({
  cartId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  guestId: z.string().uuid().optional(),
  guest: CartGuestSchema.optional(),
  status: z.enum(cartStatusKeys),
  items: z.array(CartItemSchema),
  itemCount: z.number().int().min(0).default(0),
  totalQuantity: z.number().int().min(0).default(0),
  subtotal: MoneySchema,
  discountTotal: MoneySchema,
  taxTotal: MoneySchema,
  shippingTotal: MoneySchema,
  grandTotal: MoneySchema,
  coupons: z.array(CartCouponSchema),
  promotions: z.array(
    z.object({
      promotionId: z.string().uuid(),
      name: z.string(),
      description: z.string().optional(),
      type: z.enum(['percentage', 'fixed', 'free_shipping']),
      value: z.number(),
      discountAmount: MoneySchema,
      appliedAt: z.date(),
      expiresAt: z.date().optional(),
      conditions: z.array(
        z.object({
          field: z.string(),
          operator: z.enum(['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'not_in']),
          value: z.unknown(),
        })
      ),
    })
  ),
  currency: z.string().min(3).max(3),
  isActive: z.boolean().default(true),
  isLocked: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  expiresAt: z.date().optional(),
  lastActivity: z.date(),
  metadata: z.object({
    source: z.string(),
    device: z.string(),
    ipAddress: z.string(),
    userAgent: z.string(),
    referrer: z.string().optional(),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    utmTerm: z.string().optional(),
    utmContent: z.string().optional(),
  }),
});

export const CartCreateSchema = CartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  itemCount: true,
  totalQuantity: true,
  subtotal: true,
  discountTotal: true,
  taxTotal: true,
  shippingTotal: true,
  grandTotal: true,
  lastActivity: true,
});

export const CartUpdateSchema = CartCreateSchema.partial();

export const CartSummarySchema = z.object({
  subtotal: MoneySchema,
  discountTotal: MoneySchema,
  taxTotal: MoneySchema,
  shippingTotal: MoneySchema,
  grandTotal: MoneySchema,
  itemCount: z.number().int().min(0),
  totalQuantity: z.number().int().min(0),
});
