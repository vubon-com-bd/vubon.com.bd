import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSimilarityQuery } from './get-similarity.query';
import type { SimilarityRepository } from '../../../domain/repositories/similarity.repository.interface';
import { SimilarityIdVO } from '../../../domain/value-objects/primitives/similarity-id.vo';
import type { SimilarityResponseDTO } from '../../dtos/responses/similarity-response.dto';

@QueryHandler(GetSimilarityQuery)
export class GetSimilarityHandler
  extends BaseQueryHandler<GetSimilarityQuery, SimilarityResponseDTO | null>
  implements IQueryHandler<GetSimilarityQuery>
{
  readonly queryType = 'ai.similarity.get';
  constructor(private readonly similarityRepo: SimilarityRepository) { super(); }

  async execute(query: GetSimilarityQuery): Promise<SimilarityResponseDTO | null> {
    const entity = await this.similarityRepo.findById(SimilarityIdVO.create(query.similarityId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      sourceVectorId: entity.sourceVectorId.value,
      metric: entity.metric,
      threshold: entity.threshold.value,
      matches: entity.result.matches.map((m) => ({
        vectorId: m.vectorId,
        score: m.score,
      })),
      computedAt: entity.createdAt,
    };
  }
}
