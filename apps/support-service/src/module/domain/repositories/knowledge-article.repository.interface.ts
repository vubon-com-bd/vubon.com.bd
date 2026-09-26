/**
 * KnowledgeArticleRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KnowledgeArticleEntity } from '../entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeStatusVO } from '../value-objects/primitives/knowledge-status.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface KnowledgeArticleRepository
  extends BaseRepository<KnowledgeArticleEntity, KnowledgeArticleIdVO> {
  findPublished(): Promise<readonly KnowledgeArticleEntity[]>;
  findByCategory(categoryId: TicketCategoryIdVO): Promise<readonly KnowledgeArticleEntity[]>;
  findByStatus(status: KnowledgeStatusVO): Promise<readonly KnowledgeArticleEntity[]>;
  findByAuthor(authorId: UserIdVO): Promise<readonly KnowledgeArticleEntity[]>;
  findByTag(tag: string): Promise<readonly KnowledgeArticleEntity[]>;
  searchByKeyword(keyword: string): Promise<readonly KnowledgeArticleEntity[]>;
  findMostViewed(limit: number): Promise<readonly KnowledgeArticleEntity[]>;
}
