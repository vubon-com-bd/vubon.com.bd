/**
 * KnowledgeCategoryRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KnowledgeCategoryEntity } from '../entities/knowledge-category.entity';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';

export interface KnowledgeCategoryRepository
  extends BaseRepository<KnowledgeCategoryEntity, TicketCategoryIdVO> {
  findActive(): Promise<readonly KnowledgeCategoryEntity[]>;
  findBySlug(slug: string): Promise<KnowledgeCategoryEntity | null>;
  findRoots(): Promise<readonly KnowledgeCategoryEntity[]>;
  findChildren(parentId: TicketCategoryIdVO): Promise<readonly KnowledgeCategoryEntity[]>;
}
