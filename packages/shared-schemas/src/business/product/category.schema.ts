/**
 * Category Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/category.constants থেকে।
 */

import { z } from 'zod';
import { CATEGORY_STATUS, CATEGORY } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';

export const CategoryStatusSchema = z.enum(Object.values(CATEGORY_STATUS) as [string, ...string[]]);

export const CategorySchema = z.object({
  id: UuidSchema,
  name: z.string().trim().min(CATEGORY.NAME_MIN_LENGTH).max(CATEGORY.NAME_MAX_LENGTH),
  slug: SlugSchema,
  description: z.string().trim().max(CATEGORY.DESCRIPTION_MAX_LENGTH).optional(),
  parentId: UuidSchema.optional(),
  path: z.array(UuidSchema).max(CATEGORY.MAX_DEPTH),
  depth: z.number().int().min(0).max(CATEGORY.MAX_DEPTH),
  status: CategoryStatusSchema,
  imageUrl: z.string().url().optional(),
  iconUrl: z.string().url().optional(),
  sortOrder: z.number().int().min(0),
  productCount: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CategoryPublicSchema = CategorySchema.pick({
  id: true,
  name: true,
  slug: true,
  parentId: true,
  imageUrl: true,
  productCount: true,
});

export const CategoryTreeSchema: z.ZodType<unknown> = z.lazy(() =>
  CategorySchema.extend({
    children: z.array(CategoryTreeSchema).max(CATEGORY.MAX_CHILDREN),
  })
);

export type CategoryStatusSchemaType = z.infer<typeof CategoryStatusSchema>;
export type CategorySchemaType = z.infer<typeof CategorySchema>;
export type CategoryPublicSchemaType = z.infer<typeof CategoryPublicSchema>;
