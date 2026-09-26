import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RecommendationResultEntity } from '../../../domain/entities/recommendation-result.entity';
import type { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';

export interface RecommendationResultServiceInterface
  extends BaseServiceInterface<RecommendationResultEntity, RecommendationIdVO> {
  findByRecommendationId(recommendationId: string): Promise<RecommendationResultEntity | null>;
}
