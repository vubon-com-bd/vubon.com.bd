import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { KnowledgeCategoryEntity } from '../entities/knowledge-category.entity';

export interface KnowledgeCategoryRepository extends BaseRepository<KnowledgeCategoryEntity, string> {
  findActive(): Promise<readonly KnowledgeCategoryEntity[]>;
}
