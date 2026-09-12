import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { BLOG_CATEGORY } from '@vubon/shared-constants/src/content/blog-category.constants';

const blogCategoryTypeKeys = Object.keys(BLOG_CATEGORY.TYPES) as [string, ...string[]];

export const BlogCategorySchema: z.ZodType<unknown> = BaseSchema.extend({
  categoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  type: z.enum(blogCategoryTypeKeys),
  parentId: z.string().uuid().optional(),
  parent: z.lazy(() => BlogCategorySchema).optional(),
  children: z.array(z.lazy(() => BlogCategorySchema)).default([]),
  blogCount: z.number().int().min(0).default(0),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
