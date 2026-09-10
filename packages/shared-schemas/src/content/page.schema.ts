import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { PageTemplateSchema } from './page-template.schema';
import { PageLayoutSchema } from './page-layout.schema';
import { PAGE_STATUS } from '@vubon/shared-constants/src/content/page-status.constants';
import { PAGE } from '@vubon/shared-constants/src/content/page.constants';

const pageStatusKeys = Object.keys(PAGE_STATUS) as [string, ...string[]];
const pageTypeKeys = Object.keys(PAGE.PAGE_TYPES) as [string, ...string[]];

export const PageSchema = BaseSchema.extend({
  pageId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(50000),
  status: z.enum(pageStatusKeys),
  type: z.enum(pageTypeKeys),
  template: PageTemplateSchema,
  layout: PageLayoutSchema,
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  viewCount: z.number().int().min(0).default(0),
  isHomepage: z.boolean().default(false),
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
