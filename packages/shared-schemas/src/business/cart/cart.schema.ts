/**
 * Cart Core Schema
 * @module shared-schemas/business/cart
 *
 * Cart entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';
import { CartStatusSchema } from './cart-status.schema';
import { CartItemSchema, CartItemPublicSchema } from './cart-item.schema';
import { CouponPublicSchema } from './coupon.schema';
import { VoucherPublicSchema } from './voucher.schema';

export const CartTypeSchema = z.enum(['guest', 'user', 'wishlist', 'saved', 'subscription']);

export const CartSchema = BaseEntitySchema.extend({
  userId: UuidSchema.optional(),
  sessionId: z.string().max(128).optional(),
  type: CartTypeSchema,
  status: CartStatusSchema,
  items: z.array(CartItemSchema).max(100),
  itemCount: z.number().int().nonnegative(),
  subtotal: MoneySchema,
  discountAmount: MoneySchema,
  taxAmount: MoneySchema,
  shippingAmount: MoneySchema,
  total: MoneySchema,
  currency: z.string().length(3),
  couponId: UuidSchema.optional(),
  coupon: CouponPublicSchema.optional(),
  voucherId: UuidSchema.optional(),
  voucher: VoucherPublicSchema.optional(),
  notes: z.string().max(1000).optional(),
  expiresAt: z.string().datetime(),
  lastActivityAt: z.string().datetime(),
});

export const CartPublicSchema = CartSchema.pick({
  id: true,
  type: true,
  status: true,
  itemCount: true,
  subtotal: true,
  discountAmount: true,
  taxAmount: true,
  shippingAmount: true,
  total: true,
  currency: true,
  coupon: true,
  voucher: true,
}).extend({
  items: z.array(CartItemPublicSchema).max(100),
});

export const CartSummarySchema = CartSchema.pick({
  id: true,
  itemCount: true,
  total: true,
  currency: true,
});

export const CartTotalsSchema = z.object({
  subtotal: MoneySchema,
  discountAmount: MoneySchema,
  taxAmount: MoneySchema,
  shippingAmount: MoneySchema,
  total: MoneySchema,
  currency: z.string().length(3),
});

export type CartTypeSchemaType = z.infer<typeof CartTypeSchema>;
export type CartSchemaType = z.infer<typeof CartSchema>;
export type CartPublicSchemaType = z.infer<typeof CartPublicSchema>;
export type CartSummarySchemaType = z.infer<typeof CartSummarySchema>;
export type CartTotalsSchemaType = z.infer<typeof CartTotalsSchema>;
