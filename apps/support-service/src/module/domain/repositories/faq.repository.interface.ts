/**
 * FaqRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FaqEntity } from '../entities/faq.entity';
import { FaqIdVO } from '../value-objects/primitives/faq-id.vo';
import { FaqStatusVO } from '../value-objects/primitives/faq-status.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';

export interface FaqRepository
  extends BaseRepository<FaqEntity, FaqIdVO> {
  findPublished(): Promise<readonly FaqEntity[]>;
  findByCategory(categoryId: TicketCategoryIdVO): Promise<readonly FaqEntity[]>;
  findByStatus(status: FaqStatusVO): Promise<readonly FaqEntity[]>;
  searchByKeyword(keyword: string): Promise<readonly FaqEntity[]>;
  findMostViewed(limit: number): Promise<readonly FaqEntity[]>;
}
