import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListVectorIndexesQuery } from './list-vector-indexes.query';
import type { VectorIndexRepository } from '../../../domain/repositories/vector-index.repository.interface';
import type { VectorIndexResponseDTO } from '../../dtos/responses/vector-response.dto';

@QueryHandler(ListVectorIndexesQuery)
export class ListVectorIndexesHandler
  extends BaseQueryHandler<ListVectorIndexesQuery, readonly VectorIndexResponseDTO[]>
  implements IQueryHandler<ListVectorIndexesQuery>
{
  readonly queryType = 'ai.vector.list-indexes';
  constructor(private readonly indexRepo: VectorIndexRepository) { super(); }

  async execute(query: ListVectorIndexesQuery): Promise<readonly VectorIndexResponseDTO[]> {
    const entities = query.provider
      ? await this.indexRepo.findByProvider(query.provider)
      : await this.indexRepo.findAll();
    return entities.map((e) => ({
      id: e.id.value,
      name: e.name.value,
      type: e.type.value,
      dimension: e.dimension,
      provider: e.provider,
      status: e.status.value,
      entryCount: e.entryCount,
    }));
  }
}
