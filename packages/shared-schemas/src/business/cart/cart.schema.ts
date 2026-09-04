/**
 * Cart Schema
 * কার্ট সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CART_STATUS } from '@vubon/shared-constants';

const CartItemSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  variantId: z.string().uuid().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1').max(99),
  price: z.number().min(0),
  originalPrice: z.number().min(0),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  total: z.number().min(0),
  attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
  isSelected: z.boolean().default(true),
  isSavedForLater: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CartCouponSchema = z.object({
  id: z.string().uuid(),
  couponId: z.string().uuid(),
  code: z.string().min(1),
  type: z.enum(['discount', 'free_shipping', 'buy_get', 'gift', 'voucher']),
  discountType: z.enum(['percentage', 'fixed', 'buy_x_get_y']),
  value: z.number().min(0),
  maxDiscount: z.number().min(0).optional(),
  minOrderAmount: z.number().min(0).optional(),
  description: z.string().optional(),
  isApplied: z.boolean().default(false),
  savings: z.number().min(0).default(0),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const CartPromotionSchema = z.object({
  id: z.string().uuid(),
  promotionId: z.string().uuid(),
  name: z.string().min(1),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(['discount', 'free_shipping', 'buy_get', 'gift']),
  discountType: z.enum(['percentage', 'fixed', 'buy_x_get_y']),
  value: z.number().min(0),
  condition: z
    .object({
      minAmount: z.number().min(0).optional(),
      minQuantity: z.number().int().min(0).optional(),
      products: z.array(z.string().uuid()).optional(),
      categories: z.array(z.string().uuid()).optional(),
    })
    .optional(),
  appliedProducts: z.array(z.string().uuid()).optional(),
  savings: z.number().min(0).default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CartSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  sessionId: z.string().optional(),
  items: z.array(CartItemSchema).default([]),
  coupons: z.array(CartCouponSchema).default([]),
  promotions: z.array(CartPromotionSchema).default([]),
  subtotal: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  shipping: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  status: z.enum(Object.values(CART_STATUS) as [string, ...string[]]),
  currency: z.string().default('BDT'),
  note: z.string().optional(),
  expiresAt: z.date().optional(),
  abandonedAt: z.date().optional(),
  convertedAt: z.date().optional(),
});

export const CartCreateSchema = CartSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  subtotal: true,
  discount: true,
  tax: true,
  shipping: true,
  total: true,
});

export const CartUpdateSchema = CartCreateSchema.partial();

export type Cart = z.infer<typeof CartSchema>;
export type CartCreate = z.infer<typeof CartCreateSchema>;
export type CartUpdate = z.infer<typeof CartUpdateSchema>;
