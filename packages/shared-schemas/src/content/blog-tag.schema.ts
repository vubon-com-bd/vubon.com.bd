import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { BLOG_TAG } from '@vubon/shared-constants/src/content/blog-tag.constants';

const blogTagTypeKeys = Object.keys(BLOG_TAG.TYPES) as [string, ...string[]];

export const BlogTagSchema = BaseSchema.extend({
  tagId: z.string().uuid(),
  name: z.string().min(1).max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(blogTagTypeKeys),
  blogCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
