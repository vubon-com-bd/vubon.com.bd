import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RecommendationResultEntity } from '../entities/recommendation-result.entity';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';

export interface RecommendationResultRepository
  extends BaseRepository<RecommendationResultEntity, RecommendationIdVO> {
  findByRecommendationId(
    recommendationId: RecommendationIdVO,
  ): Promise<RecommendationResultEntity | null>;
}
