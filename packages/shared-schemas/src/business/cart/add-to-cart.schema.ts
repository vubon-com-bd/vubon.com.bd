/**
 * Add to Cart Request Schema
 * @module shared-schemas/business/cart/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { CartTypeSchema } from './cart.schema';

export const AddToCartRequestSchema = z
  .object({
    productId: UuidSchema,
    variantId: UuidSchema.optional(),
    quantity: z.number().int().min(1).max(999),
    attributes: z.record(z.string(), z.string()).optional(),
    cartType: CartTypeSchema.optional().default('user'),
  })
  .strict();

export const BulkAddToCartRequestSchema = z
  .object({
    items: z
      .array(
        z.object({
          productId: UuidSchema,
          variantId: UuidSchema.optional(),
          quantity: z.number().int().min(1).max(999),
        })
      )
      .min(1)
      .max(50),
  })
  .strict();

export type AddToCartRequestSchemaType = z.infer<typeof AddToCartRequestSchema>;
export type BulkAddToCartRequestSchemaType = z.infer<typeof BulkAddToCartRequestSchema>;
