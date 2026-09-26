/**
 * FaqCategoryRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FaqCategoryEntity } from '../entities/faq-category.entity';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';

export interface FaqCategoryRepository
  extends BaseRepository<FaqCategoryEntity, TicketCategoryIdVO> {
  findActive(): Promise<readonly FaqCategoryEntity[]>;
  findBySlug(slug: string): Promise<FaqCategoryEntity | null>;
  findRoots(): Promise<readonly FaqCategoryEntity[]>;
  findChildren(parentId: TicketCategoryIdVO): Promise<readonly FaqCategoryEntity[]>;
}
