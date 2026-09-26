import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRankingQuery } from './get-ranking.query';
import type { RankingRepository } from '../../../domain/repositories/ranking.repository.interface';
import { RankingIdVO } from '../../../domain/value-objects/primitives/ranking-id.vo';
import type { RankingResponseDTO } from '../../dtos/responses/ranking-response.dto';

@QueryHandler(GetRankingQuery)
export class GetRankingHandler
  extends BaseQueryHandler<GetRankingQuery, RankingResponseDTO | null>
  implements IQueryHandler<GetRankingQuery>
{
  readonly queryType = 'ai.ranking.get';
  constructor(private readonly rankingRepo: RankingRepository) { super(); }

  async execute(query: GetRankingQuery): Promise<RankingResponseDTO | null> {
    const entity = await this.rankingRepo.findById(RankingIdVO.create(query.rankingId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      algorithm: entity.algorithm.value,
      items: entity.result.items.map((i) => ({
        productId: i.productId.value,
        rank: i.rank,
        score: i.score,
        features: i.features,
      })),
      generatedAt: entity.createdAt,
    };
  }
}
