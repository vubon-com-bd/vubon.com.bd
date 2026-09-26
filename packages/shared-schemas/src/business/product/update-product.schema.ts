/**
 * Update Product Request Schema
 * @module shared-schemas/business/product/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { ProductStatusSchema } from './product-status.schema';

export const UpdateProductRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(5000).optional(),
    shortDescription: z.string().trim().max(500).optional(),
    status: ProductStatusSchema.optional(),
    categoryId: UuidSchema.optional(),
    brandId: UuidSchema.optional(),
    tags: z.array(z.string().min(1).max(50)).max(50).optional(),
    images: z.array(z.string().url()).max(20).optional(),
    price: PositiveMoneySchema.optional(),
    compareAtPrice: PositiveMoneySchema.optional(),
    isFeatured: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type UpdateProductRequestSchemaType = z.infer<typeof UpdateProductRequestSchema>;
