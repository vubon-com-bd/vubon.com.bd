/**
 * Add Item Request DTO
 * @module cart-service/application/dtos/requests/item
 */
import { z } from 'zod';
import { AddToCartRequestSchema } from '@vubon/shared-schemas/cart';

export const AddItemRequestSchema = AddToCartRequestSchema.extend({
  cartId: z.string().uuid(),
  idempotencyKey: z.string().min(16).max(128).optional(),
});

export type AddItemRequestDTO = z.infer<typeof AddItemRequestSchema>;
