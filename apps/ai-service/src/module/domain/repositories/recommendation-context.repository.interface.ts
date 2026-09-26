import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RecommendationContextEntity } from '../entities/recommendation-context.entity';
import { RecommendationIdVO } from '../value-objects/primitives/recommendation-id.vo';

export interface RecommendationContextRepository
  extends BaseRepository<RecommendationContextEntity, RecommendationIdVO> {
  findByRecommendationId(
    recommendationId: RecommendationIdVO,
  ): Promise<RecommendationContextEntity | null>;
}
