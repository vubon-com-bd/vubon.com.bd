import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { KNOWLEDGE_BASE } from '@vubon/shared-constants/src/support/knowledge-base.constants';
import { KnowledgeBaseArticleSchema } from './knowledge-base-article.schema';
import { KnowledgeBaseCategorySchema } from './knowledge-base-category.schema';

const knowledgeBaseStatusKeys = Object.keys(KNOWLEDGE_BASE.STATUS) as [string, ...string[]];

export const KnowledgeBaseSchema = BaseSchema.extend({
  knowledgeBaseId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(knowledgeBaseStatusKeys),
  categories: z.array(KnowledgeBaseCategorySchema),
  articles: z.array(KnowledgeBaseArticleSchema),
  articleCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isPublic: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
