import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListRoutesQuery } from './list-routes.query';
import type { RouteRepository } from '../../../domain/repositories/route.repository.interface';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@QueryHandler(ListRoutesQuery)
export class ListRoutesHandler
  extends BaseQueryHandler<ListRoutesQuery, readonly RouteResponseDTO[]>
  implements IQueryHandler<ListRoutesQuery>
{
  readonly queryType = 'logistics.route.list';

  constructor(private readonly repo: RouteRepository) {
    super();
  }

  async execute(query: ListRoutesQuery): Promise<readonly RouteResponseDTO[]> {
    const entities = query.optimizedOnly ? await this.repo.findOptimized() : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as RouteResponseDTO));
  }
}
