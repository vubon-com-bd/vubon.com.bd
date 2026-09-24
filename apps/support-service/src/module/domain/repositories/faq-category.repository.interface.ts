import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FaqCategoryEntity } from '../entities/faq-category.entity';

export interface FaqCategoryRepository extends BaseRepository<FaqCategoryEntity, string> {
  findActive(): Promise<readonly FaqCategoryEntity[]>;
}
