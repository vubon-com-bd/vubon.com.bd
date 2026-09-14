/**
 * Cart Item Schema
 * @module shared-schemas/business/cart
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema, PositiveMoneySchema } from '../../common/primitives/money.schema';

export const CartItemSchema = z.object({
  id: UuidSchema,
  cartId: UuidSchema,
  productId: UuidSchema,
  variantId: UuidSchema.optional(),
  sku: z.string().min(1).max(64),
  name: z.string().min(1).max(200),
  imageUrl: z.string().url().optional(),
  unitPrice: PositiveMoneySchema,
  compareAtPrice: MoneySchema.optional(),
  quantity: z.number().int().min(1).max(999),
  subtotal: PositiveMoneySchema,
  discountAmount: MoneySchema.optional(),
  taxAmount: MoneySchema.optional(),
  total: PositiveMoneySchema,
  currency: z.string().length(3),
  attributes: z.record(z.string(), z.string()).optional(),
  isAvailable: z.boolean(),
  addedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CartItemPublicSchema = CartItemSchema.pick({
  id: true,
  productId: true,
  variantId: true,
  name: true,
  imageUrl: true,
  unitPrice: true,
  quantity: true,
  total: true,
  isAvailable: true,
});

export type CartItemSchemaType = z.infer<typeof CartItemSchema>;
export type CartItemPublicSchemaType = z.infer<typeof CartItemPublicSchema>;
