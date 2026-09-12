import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CATEGORY } from '@vubon/shared-constants/src/business/product/category.constants';

const categoryStatusKeys = Object.keys(CATEGORY.STATUS) as [string, ...string[]];

// Define the base schema first
const CategoryBaseSchema = BaseSchema.extend({
  categoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional(),
  status: z.enum(categoryStatusKeys),
  parentId: z.string().uuid().optional(),
  productCount: z.number().int().min(0).default(0),
  order: z.number().int().min(0).default(0),
  icon: z.string().optional(),
  image: z.string().url().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      isFeatured: z.boolean().default(false),
      isActive: z.boolean().default(true),
    })
    .optional(),
});

// Create a function to get the schema with lazy references
function getCategorySchema(): z.ZodObject<z.ZodRawShape> {
  return CategoryBaseSchema.extend({
    parent: z.lazy(() => getCategorySchema()).optional(),
    children: z.array(z.lazy(() => getCategorySchema())).default([]),
  }) as z.ZodObject<z.ZodRawShape>;
}

// Export the schema
export const CategorySchema = getCategorySchema();

export const CategoryCreateSchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  children: true,
  productCount: true,
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;
