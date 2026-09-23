import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetRouteQuery } from './get-route.query';
import type { RouteRepository } from '../../../domain/repositories/route.repository.interface';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo';
import type { RouteResponseDTO } from '../../dtos/responses/route-response.dto';

@QueryHandler(GetRouteQuery)
export class GetRouteHandler
  extends BaseQueryHandler<GetRouteQuery, RouteResponseDTO | null>
  implements IQueryHandler<GetRouteQuery>
{
  readonly queryType = 'logistics.route.get';

  constructor(private readonly repo: RouteRepository) {
    super();
  }

  async execute(query: GetRouteQuery): Promise<RouteResponseDTO | null> {
    const entity = await this.repo.findById(RouteIdVO.create(query.routeId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as RouteResponseDTO;
  }
}
