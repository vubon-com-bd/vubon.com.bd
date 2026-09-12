import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { ContentCategorySchema } from './content-category.schema';
import { ContentTagSchema } from './content-tag.schema';
import { ContentFormatSchema } from './content-format.schema';
import { ContentLanguageSchema } from './content-language.schema';
import { ContentLicenseSchema } from './content-license.schema';
import { CONTENT_STATUS } from '@vubon/shared-constants/src/content/content-status.constants';
import { CONTENT_TYPE } from '@vubon/shared-constants/src/content/content-type.constants';

const contentStatusKeys = Object.keys(CONTENT_STATUS) as [string, ...string[]];
const contentTypeKeys = Object.keys(CONTENT_TYPE) as [string, ...string[]];

export const ContentSchema = BaseSchema.extend({
  contentId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().max(500).optional(),
  body: z.string().min(10).max(100000),
  status: z.enum(contentStatusKeys),
  type: z.enum(contentTypeKeys),
  categories: z.array(ContentCategorySchema),
  tags: z.array(ContentTagSchema),
  format: ContentFormatSchema,
  language: ContentLanguageSchema,
  license: ContentLicenseSchema,
  authorId: z.string().uuid(),
  author: UserSchema,
  editorId: z.string().uuid().optional(),
  editor: UserSchema.optional(),
  featuredImage: z.string().url().optional(),
  images: z.array(z.string().url()),
  attachments: z.array(z.string().url()),
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
      readingTime: z.number().int().min(0).optional(),
      wordCount: z.number().int().min(0).optional(),
      lastEditedAt: z.date().optional(),
      editedBy: z.string().optional(),
    })
    .optional(),
});

export const ContentCreateSchema = ContentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  likeCount: true,
  shareCount: true,
  commentCount: true,
  publishedAt: true,
});

export const ContentUpdateSchema = ContentCreateSchema.partial();
