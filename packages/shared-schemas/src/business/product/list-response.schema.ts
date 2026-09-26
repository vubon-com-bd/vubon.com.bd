/**
 * List Response Schema
 * @module shared-schemas/business/product/responses
 */

import { z } from 'zod';
import { ProductPublicSchema, ProductSummarySchema } from './product.schema';

export const ProductListResponseSchema = z.object({
  success: z.literal(true),
  products: z.array(ProductPublicSchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export const ProductSummaryListResponseSchema = z.object({
  success: z.literal(true),
  products: z.array(ProductSummarySchema).max(100),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export type ProductListResponseSchemaType = z.infer<typeof ProductListResponseSchema>;
export type ProductSummaryListResponseSchemaType = z.infer<typeof ProductSummaryListResponseSchema>;
