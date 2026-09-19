/**
 * Product Response Schema
 * @module shared-schemas/business/product/responses
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { ProductSchema, ProductPublicSchema } from './product.schema';

export const ProductResponseSchema = z.object({
  success: z.literal(true),
  product: ProductSchema,
});

export const ProductPublicResponseSchema = z.object({
  success: z.literal(true),
  product: ProductPublicSchema,
});

export const ProductDeleteResponseSchema = z.object({
  success: z.literal(true),
  productId: UuidSchema,
  deletedAt: z.string().datetime(),
});

export type ProductResponseSchemaType = z.infer<typeof ProductResponseSchema>;
export type ProductPublicResponseSchemaType = z.infer<typeof ProductPublicResponseSchema>;
export type ProductDeleteResponseSchemaType = z.infer<typeof ProductDeleteResponseSchema>;
