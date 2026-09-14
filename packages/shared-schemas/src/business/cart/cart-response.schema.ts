/**
 * Cart Response Schema
 * @module shared-schemas/business/cart/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { CartPublicSchema, CartSummarySchema } from './cart.schema';
import { CartTotalsSchema } from './cart.schema';

export const CartResponseSchema = z.object({
  success: z.literal(true),
  cart: CartPublicSchema,
});

export const CartSummaryResponseSchema = z.object({
  success: z.literal(true),
  cart: CartSummarySchema,
});

export const CartTotalsResponseSchema = z.object({
  success: z.literal(true),
  totals: CartTotalsSchema,
});

export const CartItemRemoveResponseSchema = z.object({
  success: z.literal(true),
  itemId: UuidSchema,
  removedAt: z.string().datetime(),
});

export const CartClearResponseSchema = z.object({
  success: z.literal(true),
  cartId: UuidSchema,
  clearedAt: z.string().datetime(),
});

export type CartResponseSchemaType = z.infer<typeof CartResponseSchema>;
export type CartSummaryResponseSchemaType = z.infer<typeof CartSummaryResponseSchema>;
export type CartTotalsResponseSchemaType = z.infer<typeof CartTotalsResponseSchema>;
export type CartItemRemoveResponseSchemaType = z.infer<typeof CartItemRemoveResponseSchema>;
export type CartClearResponseSchemaType = z.infer<typeof CartClearResponseSchema>;
