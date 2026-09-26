import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListModelsQuery } from './list-models.query';
import type { ModelRepository } from '../../../domain/repositories/model.repository.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@QueryHandler(ListModelsQuery)
export class ListModelsHandler
  extends BaseQueryHandler<ListModelsQuery, readonly ModelResponseDTO[]>
  implements IQueryHandler<ListModelsQuery>
{
  readonly queryType = 'ai.model.list';

  constructor(private readonly modelRepo: ModelRepository) {
    super();
  }

  async execute(query: ListModelsQuery): Promise<readonly ModelResponseDTO[]> {
    let entities = await this.modelRepo.findAll();
    if (query.status) entities = entities.filter((e) => e.status.value === query.status);
    if (query.modelType) entities = entities.filter((e) => e.type.value === query.modelType);
    if (query.providerId) entities = entities.filter((e) => e.providerId.value === query.providerId);
    return entities
      .slice(query.offset, query.offset + query.limit)
      .map((e) => ({
        id: e.id.value,
        name: e.name.value,
        version: e.modelVersion.value,
        status: e.status.value,
        type: e.type.value,
        providerId: e.providerId.value,
        endpoint: e.endpoint?.value ?? null,
        description: e.description,
      } as unknown as ModelResponseDTO));
  }
}
