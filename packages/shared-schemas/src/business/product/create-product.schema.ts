/**
 * Create Product Request Schema
 * @module shared-schemas/business/product/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { ProductTypeSchema } from './product-type.schema';
import { ProductDimensionsSchema } from './product.schema';

export const CreateProductRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    slug: SlugSchema,
    description: z.string().trim().max(5000).optional(),
    shortDescription: z.string().trim().max(500).optional(),
    type: ProductTypeSchema,
    categoryId: UuidSchema,
    brandId: UuidSchema.optional(),
    vendorId: UuidSchema.optional(),
    tags: z.array(z.string().min(1).max(50)).max(50).optional(),
    images: z.array(z.string().url()).max(20).optional(),
    price: PositiveMoneySchema,
    compareAtPrice: PositiveMoneySchema.optional(),
    currency: z.string().length(3),
    sku: z.string().trim().min(1).max(64),
    barcode: z.string().trim().max(64).optional(),
    weight: z.number().positive().optional(),
    dimensions: ProductDimensionsSchema.optional(),
  })
  .strict();

export type CreateProductRequestSchemaType = z.infer<typeof CreateProductRequestSchema>;
