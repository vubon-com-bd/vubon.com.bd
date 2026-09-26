import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import type { RecommendationResponseDTO } from '../dtos/responses/recommendation-response.dto';

export class RecommendationMapper extends BaseMapper<RecommendationEntity, RecommendationResponseDTO> {
  toTarget(source: RecommendationEntity): RecommendationResponseDTO {
    return {
      id: source.id.value,
      userId: source.context.userId.value,
      type: source.type.value,
      strategy: source.strategy.value,
      status: source.status.value,
      items: source.result.items.map((i) => ({
        productId: i.productId.value,
        score: i.score.value,
        rank: i.rank,
        reason: i.reason,
      })),
      generatedAt: source.result.generatedAt.toISOString(),
    };
  }

  toSource(_target: RecommendationResponseDTO): RecommendationEntity {
    throw new Error('RecommendationMapper.toSource not supported');
  }
}
