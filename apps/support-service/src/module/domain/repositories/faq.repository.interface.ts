import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FaqEntity } from '../entities/faq.entity';
import { FaqIdVO } from '../value-objects/primitives/faq-id.vo';

export interface FaqRepository extends BaseRepository<FaqEntity, FaqIdVO> {
  findPublished(): Promise<readonly FaqEntity[]>;
  searchByKeyword(keyword: string): Promise<readonly FaqEntity[]>;
  findByCategory(categoryId: string): Promise<readonly FaqEntity[]>;
}
