import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetModelQuery } from './get-model.query';
import type { ModelRepository } from '../../../domain/repositories/model.repository.interface';
import { ModelIdVO } from '../../../domain/value-objects/primitives/model-id.vo';
import { ModelNotFoundError } from '../../errors/model.errors';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@QueryHandler(GetModelQuery)
export class GetModelHandler
  extends BaseQueryHandler<GetModelQuery, ModelResponseDTO>
  implements IQueryHandler<GetModelQuery>
{
  readonly queryType = 'ai.model.get';
  constructor(private readonly modelRepo: ModelRepository) { super(); }

  async execute(query: GetModelQuery): Promise<ModelResponseDTO> {
    const entity = await this.modelRepo.findById(ModelIdVO.create(query.modelId));
    if (!entity) throw new ModelNotFoundError(query.modelId);
    return {
      id: entity.id.value,
      name: entity.name.value,
      version: entity.modelVersion.value,
      status: entity.status.value,
      type: entity.type.value,
      providerId: entity.providerId.value,
      endpoint: entity.endpoint?.value ?? null,
      description: entity.description,
    } as unknown as ModelResponseDTO;
  }
}
