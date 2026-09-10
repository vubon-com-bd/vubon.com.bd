import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { WHITE_PAPER_STATUS } from '@vubon/shared-constants/src/content/white-paper-status.constants';
import { WHITE_PAPER } from '@vubon/shared-constants/src/content/white-paper.constants';

const whitePaperStatusKeys = Object.keys(WHITE_PAPER_STATUS) as [string, ...string[]];
const whitePaperTypeKeys = Object.keys(WHITE_PAPER.WHITE_PAPER_TYPES) as [string, ...string[]];

export const WhitePaperSchema = BaseSchema.extend({
  whitePaperId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(100000),
  status: z.enum(whitePaperStatusKeys),
  type: z.enum(whitePaperTypeKeys),
  authorId: z.string().uuid(),
  author: UserSchema,
  featuredImage: z.string().url().optional(),
  pdfUrl: z.string().url().optional(),
  wordCount: z.number().int().min(0).default(0),
  viewCount: z.number().int().min(0).default(0),
  downloadCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      seoKeywords: z.array(z.string()).optional(),
      industry: z.string().optional(),
      researchDate: z.date().optional(),
      version: z.number().int().min(1).default(1),
    })
    .optional(),
});
