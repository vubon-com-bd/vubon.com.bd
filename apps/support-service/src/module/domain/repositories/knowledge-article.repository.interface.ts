import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KnowledgeArticleEntity } from '../entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../value-objects/primitives/knowledge-article-id.vo';

export interface KnowledgeArticleRepository extends BaseRepository<KnowledgeArticleEntity, KnowledgeArticleIdVO> {
  findPublished(): Promise<readonly KnowledgeArticleEntity[]>;
  searchByKeyword(keyword: string): Promise<readonly KnowledgeArticleEntity[]>;
  findByCategory(categoryId: string): Promise<readonly KnowledgeArticleEntity[]>;
}
