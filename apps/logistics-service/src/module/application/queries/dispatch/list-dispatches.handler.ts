import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDispatchesQuery } from './list-dispatches.query';
import type { DispatchRepository } from '../../../domain/repositories/dispatch.repository.interface';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@QueryHandler(ListDispatchesQuery)
export class ListDispatchesHandler
  extends BaseQueryHandler<ListDispatchesQuery, readonly DispatchResponseDTO[]>
  implements IQueryHandler<ListDispatchesQuery>
{
  readonly queryType = 'logistics.dispatch.list';

  constructor(private readonly repo: DispatchRepository) {
    super();
  }

  async execute(query: ListDispatchesQuery): Promise<readonly DispatchResponseDTO[]> {
    const entities = query.status ? await this.repo.findByStatus(query.status) : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as DispatchResponseDTO));
  }
}
