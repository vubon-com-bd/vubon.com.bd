import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { BlogCategorySchema } from './blog-category.schema';
import { BlogTagSchema } from './blog-tag.schema';
import { BLOG_STATUS } from '@vubon/shared-constants/src/content/blog-status.constants';
import { BLOG } from '@vubon/shared-constants/src/content/blog.constants';

const blogStatusKeys = Object.keys(BLOG_STATUS) as [string, ...string[]];
const blogTypeKeys = Object.keys(BLOG.BLOG_TYPES) as [string, ...string[]];

export const BlogSchema = BaseSchema.extend({
  blogId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().min(10).max(500),
  content: z.string().min(10).max(100000),
  status: z.enum(blogStatusKeys),
  type: z.enum(blogTypeKeys),
  categories: z.array(BlogCategorySchema),
  tags: z.array(BlogTagSchema),
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  images: z.array(z.string().url()),
  readingTime: z.number().int().min(0).default(0),
  wordCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  commentCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  scheduledAt: z.date().optional(),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      canonicalUrl: z.string().url().optional(),
      lastEditedAt: z.date().optional(),
      editedBy: z.string().optional(),
    })
    .optional(),
});

export const BlogCreateSchema = BlogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  likeCount: true,
  shareCount: true,
  commentCount: true,
  readingTime: true,
  wordCount: true,
  publishedAt: true,
});
