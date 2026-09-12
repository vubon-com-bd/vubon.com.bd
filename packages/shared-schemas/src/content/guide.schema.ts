import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { GUIDE_STATUS } from '@vubon/shared-constants/src/content/guide-status.constants';
import { GUIDE } from '@vubon/shared-constants/src/content/guide.constants';

const guideStatusKeys = Object.keys(GUIDE_STATUS) as [string, ...string[]];
const guideTypeKeys = Object.keys(GUIDE.GUIDE_TYPES) as [string, ...string[]];

export const GuideSchema = BaseSchema.extend({
  guideId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(50000),
  status: z.enum(guideStatusKeys),
  type: z.enum(guideTypeKeys),
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  readingTime: z.number().int().min(0).default(0),
  wordCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  likeCount: z.number().int().min(0).default(0),
  shareCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      lastUpdatedAt: z.date().optional(),
      version: z.number().int().min(1).default(1),
    })
    .optional(),
});
