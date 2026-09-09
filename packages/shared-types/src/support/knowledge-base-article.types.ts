import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { KNOWLEDGE_BASE } from '@vubon/shared-constants/src/support/knowledge-base.constants';
import { KnowledgeBase } from './knowledge-base.types';
import { KnowledgeBaseCategory } from './knowledge-base-category.types';

export interface KnowledgeBaseArticle extends BaseEntity {
  articleId: string;
  knowledgeBaseId: string;
  knowledgeBase: KnowledgeBase;
  categoryId: string;
  category: KnowledgeBaseCategory;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: keyof typeof KNOWLEDGE_BASE.STATUS | string;
  type: keyof typeof KNOWLEDGE_BASE.ARTICLE_TYPES | string;
  authorId: string;
  author: User;
  editorId?: string;
  editor?: User;
  tags: string[];
  featuredImage?: string;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: Record<string, unknown>;
}
