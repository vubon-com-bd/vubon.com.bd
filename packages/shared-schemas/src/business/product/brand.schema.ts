/**
 * Brand Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/brand.constants থেকে।
 */

import { z } from 'zod';
import { BRAND_STATUS, BRAND } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';

export const BrandStatusSchema = z.enum(Object.values(BRAND_STATUS) as [string, ...string[]]);

export const BrandSchema = z.object({
  id: UuidSchema,
  name: z.string().trim().min(BRAND.NAME_MIN_LENGTH).max(BRAND.NAME_MAX_LENGTH),
  slug: SlugSchema,
  description: z.string().trim().max(BRAND.DESCRIPTION_MAX_LENGTH).optional(),
  logoUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  website: z.string().url().max(BRAND.WEBSITE_MAX_LENGTH).optional(),
  status: BrandStatusSchema,
  isFeatured: z.boolean(),
  productCount: z.number().int().nonnegative(),
  country: z.string().length(2).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const BrandPublicSchema = BrandSchema.pick({
  id: true,
  name: true,
  slug: true,
  logoUrl: true,
  productCount: true,
});

export type BrandStatusSchemaType = z.infer<typeof BrandStatusSchema>;
export type BrandSchemaType = z.infer<typeof BrandSchema>;
export type BrandPublicSchemaType = z.infer<typeof BrandPublicSchema>;
