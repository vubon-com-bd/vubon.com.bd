import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CONTENT_CATEGORY } from '@vubon/shared-constants/src/content/content-category.constants';

const contentCategoryTypeKeys = Object.keys(CONTENT_CATEGORY.TYPES) as [string, ...string[]];

export const ContentCategorySchema: z.ZodType<unknown> = BaseSchema.extend({
  categoryId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  type: z.enum(contentCategoryTypeKeys),
  parentId: z.string().uuid().optional(),
  parent: z.lazy(() => ContentCategorySchema).optional(),
  children: z.array(z.lazy(() => ContentCategorySchema)).default([]),
  contentCount: z.number().int().min(0).default(0),
  order: z.number().int().min(0).default(0),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
