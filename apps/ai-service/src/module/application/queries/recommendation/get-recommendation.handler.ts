import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRecommendationQuery } from './get-recommendation.query';
import type { RecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { RecommendationIdVO } from '../../../domain/value-objects/primitives/recommendation-id.vo';
import { RecommendationNotFoundError } from '../../errors/recommendation.errors';
import type { RecommendationResponseDTO } from '../../dtos/responses/recommendation-response.dto';

@QueryHandler(GetRecommendationQuery)
export class GetRecommendationHandler
  extends BaseQueryHandler<GetRecommendationQuery, RecommendationResponseDTO>
  implements IQueryHandler<GetRecommendationQuery>
{
  readonly queryType = 'ai.recommendation.get';
  constructor(private readonly recommendationRepo: RecommendationRepository) { super(); }

  async execute(query: GetRecommendationQuery): Promise<RecommendationResponseDTO> {
    const entity = await this.recommendationRepo.findById(
      RecommendationIdVO.create(query.recommendationId),
    );
    if (!entity) throw new RecommendationNotFoundError(query.recommendationId);
    return {
      id: entity.id.value,
      userId: entity.context.userId.value,
      type: entity.type.value,
      strategy: entity.strategy.value,
      status: entity.status.value,
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        score: i.score.value,
        rank: i.rank,
        reason: i.reason,
      })),
      generatedAt: entity.result.generatedAt.toISOString(),
    };
  }
}
