import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { KNOWLEDGE_BASE } from '@vubon/shared-constants/src/support/knowledge-base.constants';

const knowledgeBaseArticleStatusKeys = Object.keys(KNOWLEDGE_BASE.STATUS) as [string, ...string[]];
const knowledgeBaseArticleTypeKeys = Object.keys(KNOWLEDGE_BASE.ARTICLE_TYPES) as [
  string,
  ...string[],
];

export const KnowledgeBaseArticleSchema = BaseSchema.extend({
  articleId: z.string().uuid(),
  knowledgeBaseId: z.string().uuid(),
  categoryId: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  content: z.string().min(10).max(50000),
  excerpt: z.string().optional(),
  status: z.enum(knowledgeBaseArticleStatusKeys),
  type: z.enum(knowledgeBaseArticleTypeKeys),
  authorId: z.string().uuid(),
  author: UserSchema,
  editorId: z.string().uuid().optional(),
  editor: UserSchema.optional(),
  tags: z.array(z.string()),
  featuredImage: z.string().url().optional(),
  viewCount: z.number().int().min(0).default(0),
  helpfulCount: z.number().int().min(0).default(0),
  notHelpfulCount: z.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
