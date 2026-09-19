/**
 * Product Core Schema
 * @module shared-schemas/business/product
 *
 * Product entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../../common/base/base-entity.schema';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';
import { PositiveMoneySchema } from '../../common/primitives/money.schema';
import { ProductStatusSchema } from './product-status.schema';
import { ProductTypeSchema } from './product-type.schema';
import { VariantSchema } from './variant.schema';
import { ProductAttributeSchema } from './attribute.schema';
import { InventorySchema } from './inventory.schema';
import { PricingSchema } from './pricing.schema';
import { ReviewSummarySchema } from './review.schema';

export const ProductDimensionsSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
  unit: z.enum(['cm', 'in']),
});

export const ProductSchema = BaseEntitySchema.extend({
  name: z.string().trim().min(1).max(200),
  slug: SlugSchema,
  description: z.string().trim().max(5000).optional(),
  shortDescription: z.string().trim().max(500).optional(),
  type: ProductTypeSchema,
  status: ProductStatusSchema,
  vendorId: UuidSchema.optional(),
  categoryId: UuidSchema,
  brandId: UuidSchema.optional(),
  tags: z.array(z.string().min(1).max(50)).max(50),
  images: z.array(z.string().url()).max(20),
  thumbnailUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  price: PositiveMoneySchema,
  compareAtPrice: PositiveMoneySchema.optional(),
  currency: z.string().length(3),
  variants: z.array(VariantSchema).max(100).optional(),
  attributes: z.array(ProductAttributeSchema).max(50).optional(),
  inventory: InventorySchema.optional(),
  pricing: PricingSchema.optional(),
  reviewSummary: ReviewSummarySchema.optional(),
  totalStock: z.number().int().nonnegative(),
  sku: z.string().trim().min(1).max(64),
  barcode: z.string().trim().max(64).optional(),
  weight: z.number().positive().optional(),
  dimensions: ProductDimensionsSchema.optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  publishedAt: z.string().datetime().optional(),
});

export const ProductPublicSchema = ProductSchema.pick({
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  type: true,
  status: true,
  categoryId: true,
  brandId: true,
  tags: true,
  images: true,
  thumbnailUrl: true,
  price: true,
  compareAtPrice: true,
  currency: true,
  totalStock: true,
  reviewSummary: true,
  isFeatured: true,
});

export const ProductSummarySchema = ProductSchema.pick({
  id: true,
  name: true,
  slug: true,
  thumbnailUrl: true,
  price: true,
  compareAtPrice: true,
  totalStock: true,
}).extend({
  averageRating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
});

export const ProductListFilterSchema = z.object({
  status: ProductStatusSchema.optional(),
  type: ProductTypeSchema.optional(),
  categoryId: UuidSchema.optional(),
  brandId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  isFeatured: z.boolean().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  inStock: z.boolean().optional(),
  search: z.string().max(200).optional(),
  tags: z.array(z.string()).max(20).optional(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type ProductPublicSchemaType = z.infer<typeof ProductPublicSchema>;
export type ProductSummarySchemaType = z.infer<typeof ProductSummarySchema>;
export type ProductListFilterSchemaType = z.infer<typeof ProductListFilterSchema>;
