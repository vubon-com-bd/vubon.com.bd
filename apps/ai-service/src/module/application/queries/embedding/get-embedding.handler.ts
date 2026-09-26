import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetEmbeddingQuery } from './get-embedding.query';
import type { EmbeddingRepository } from '../../../domain/repositories/embedding.repository.interface';
import type { EmbeddingResponseDTO } from '../../dtos/responses/embedding-response.dto';

@QueryHandler(GetEmbeddingQuery)
export class GetEmbeddingHandler
  extends BaseQueryHandler<GetEmbeddingQuery, readonly EmbeddingResponseDTO[]>
  implements IQueryHandler<GetEmbeddingQuery>
{
  readonly queryType = 'ai.embedding.get';
  constructor(private readonly embeddingRepo: EmbeddingRepository) { super(); }

  async execute(query: GetEmbeddingQuery): Promise<readonly EmbeddingResponseDTO[]> {
    const entities = await this.embeddingRepo.findBySource(query.sourceId, query.sourceType);
    return entities.map((e) => ({
      id: e.id.value,
      sourceId: e.sourceId,
      sourceType: e.sourceType,
      type: e.type.value,
      model: e.model.value,
      dimension: e.dimension.value,
      status: e.status.value,
      createdAt: e.createdAt,
    }));
  }
}
