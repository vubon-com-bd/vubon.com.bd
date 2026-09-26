import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetActiveModelQuery } from './get-active-model.query';
import type { ModelRepository } from '../../../domain/repositories/model.repository.interface';
import type { ModelResponseDTO } from '../../dtos/responses/model-response.dto';

@QueryHandler(GetActiveModelQuery)
export class GetActiveModelHandler
  extends BaseQueryHandler<GetActiveModelQuery, ModelResponseDTO | null>
  implements IQueryHandler<GetActiveModelQuery>
{
  readonly queryType = 'ai.model.get-active';
  constructor(private readonly modelRepo: ModelRepository) { super(); }

  async execute(query: GetActiveModelQuery): Promise<ModelResponseDTO | null> {
    const deployed = await this.modelRepo.findDeployed();
    const match = query.typeFilter
      ? deployed.find((e) => e.type.value === query.typeFilter)
      : deployed[0];
    if (!match) return null;
    return {
      id: match.id.value,
      name: match.name.value,
      version: match.modelVersion.value,
      status: match.status.value,
      type: match.type.value,
      providerId: match.providerId.value,
      endpoint: match.endpoint?.value ?? null,
      description: match.description,
    } as unknown as ModelResponseDTO;
  }
}
