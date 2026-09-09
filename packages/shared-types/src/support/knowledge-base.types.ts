import { BaseEntity } from '../common/base.types';
import { KNOWLEDGE_BASE } from '@vubon/shared-constants/src/support/knowledge-base.constants';
import { KnowledgeBaseArticle } from './knowledge-base-article.types';
import { KnowledgeBaseCategory } from './knowledge-base-category.types';

export interface KnowledgeBase extends BaseEntity {
  knowledgeBaseId: string;
  name: string;
  description?: string;
  status: keyof typeof KNOWLEDGE_BASE.STATUS | string;
  categories: KnowledgeBaseCategory[];
  articles: KnowledgeBaseArticle[];
  articleCount: number;
  isActive: boolean;
  isPublic: boolean;
  metadata: Record<string, unknown>;
}
