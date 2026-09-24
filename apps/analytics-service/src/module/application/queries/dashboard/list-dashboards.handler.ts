import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListDashboardsQuery } from './list-dashboards.query';
import type { DashboardRepository } from '../../../domain/repositories/dashboard.repository.interface';
import {
  type DashboardResponseDTO,
  toDashboardResponse,
} from '../../dtos/responses';

@QueryHandler(ListDashboardsQuery)
export class ListDashboardsHandler
  extends BaseQueryHandler<ListDashboardsQuery, readonly DashboardResponseDTO[]>
  implements IQueryHandler<ListDashboardsQuery>
{
  readonly queryType = 'analytics.dashboard.list';

  constructor(private readonly dashboardRepo: DashboardRepository) {
    super();
  }

  async execute(query: ListDashboardsQuery): Promise<readonly DashboardResponseDTO[]> {
    const entities = await this.dashboardRepo.findByOwner(query.ownerId);
    return entities.map((e) => toDashboardResponse(e));
  }
}
