import type { KnowledgeArticleEntity } from '../../../domain/entities/knowledge-article.entity';
import type { KnowledgeArticleIdVO } from '../../../domain/value-objects/primitives/knowledge-article-id.vo';

export interface KnowledgeBaseServiceInterface {
  findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null>;
  listPublished(): Promise<readonly KnowledgeArticleEntity[]>;
  search(keyword: string): Promise<readonly KnowledgeArticleEntity[]>;
}
