import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RecommendationContextEntity } from '../../../domain/entities/recommendation-context.entity';
import type { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';

export interface RecommendationContextServiceInterface
  extends BaseServiceInterface<RecommendationContextEntity, RecommendationIdVO> {
  findByRecommendationId(recommendationId: string): Promise<RecommendationContextEntity | null>;
}
