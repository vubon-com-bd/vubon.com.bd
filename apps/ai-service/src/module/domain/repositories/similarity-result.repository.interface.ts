import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SimilarityResultEntity } from '../entities/similarity-result.entity';
import { SimilarityIdVO } from '../value-objects/primitives/similarity-id.vo';

export interface SimilarityResultRepository
  extends BaseRepository<SimilarityResultEntity, SimilarityIdVO> {
  findBySimilarityId(
    similarityId: SimilarityIdVO,
  ): Promise<SimilarityResultEntity | null>;
}
