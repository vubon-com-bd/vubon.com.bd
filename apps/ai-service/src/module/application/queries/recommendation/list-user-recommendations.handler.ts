import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListUserRecommendationsQuery } from './list-user-recommendations.query';
import type { RecommendationRepository } from '../../../domain/repositories/recommendation.repository.interface';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { RecommendationResponseDTO } from '../../dtos/responses/recommendation-response.dto';

@QueryHandler(ListUserRecommendationsQuery)
export class ListUserRecommendationsHandler
  extends BaseQueryHandler<ListUserRecommendationsQuery, readonly RecommendationResponseDTO[]>
  implements IQueryHandler<ListUserRecommendationsQuery>
{
  readonly queryType = 'ai.recommendation.list-for-user';
  constructor(private readonly recommendationRepo: RecommendationRepository) { super(); }

  async execute(query: ListUserRecommendationsQuery): Promise<readonly RecommendationResponseDTO[]> {
    const entities = await this.recommendationRepo.findByUser(UserIdVO.create(query.userId));
    return entities.slice(0, query.limit).map((entity) => ({
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
    }));
  }
}
