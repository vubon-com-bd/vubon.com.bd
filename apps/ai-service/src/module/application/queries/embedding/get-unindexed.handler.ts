import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetUnindexedEmbeddingsQuery } from './get-unindexed.query';
import type { EmbeddingRepository } from '../../../domain/repositories/embedding.repository.interface';
import type { EmbeddingResponseDTO } from '../../dtos/responses/embedding-response.dto';

@QueryHandler(GetUnindexedEmbeddingsQuery)
export class GetUnindexedEmbeddingsHandler
  extends BaseQueryHandler<GetUnindexedEmbeddingsQuery, readonly EmbeddingResponseDTO[]>
  implements IQueryHandler<GetUnindexedEmbeddingsQuery>
{
  readonly queryType = 'ai.embedding.list-unindexed';
  constructor(private readonly embeddingRepo: EmbeddingRepository) { super(); }

  async execute(_query: GetUnindexedEmbeddingsQuery): Promise<readonly EmbeddingResponseDTO[]> {
    const entities = await this.embeddingRepo.findUnindexed();
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
