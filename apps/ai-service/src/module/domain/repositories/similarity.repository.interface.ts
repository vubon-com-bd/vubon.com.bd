import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SimilarityEntity } from '../entities/similarity.entity';
import { SimilarityIdVO } from '../value-objects/primitives/similarity-id.vo';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';

export interface SimilarityRepository
  extends BaseRepository<SimilarityEntity, SimilarityIdVO> {
  findByVectorId(vectorId: VectorIdVO): Promise<readonly SimilarityEntity[]>;
  findByMetric(metric: string): Promise<readonly SimilarityEntity[]>;
  findRecent(limit: number): Promise<readonly SimilarityEntity[]>;
}
