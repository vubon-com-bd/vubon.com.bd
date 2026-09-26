import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { RecommendationEntity } from '../../../domain/entities/recommendation.entity';
import type { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';
import type { GenerateRecommendationRequestDTO } from '../../dtos/requests/recommendation/generate-recommendation.dto';
import type { RecommendationResponseDTO } from '../../dtos/responses/recommendation-response.dto';

export interface RecommendationServiceInterface
  extends BaseServiceInterface<RecommendationEntity, RecommendationIdVO> {
  generate(input: GenerateRecommendationRequestDTO): Promise<RecommendationResponseDTO>;
  trackClick(recommendationId: string, userId: string, productId: string): Promise<void>;
  trackConversion(recommendationId: string, userId: string, productId: string, orderId?: string): Promise<void>;
  submitFeedback(recommendationId: string, userId: string, productId: string, rating: number): Promise<void>;
}
