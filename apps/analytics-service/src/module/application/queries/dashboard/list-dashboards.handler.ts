import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListDashboardsQuery } from './list-dashboards.query.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@QueryHandler(ListDashboardsQuery)
export class ListDashboardsHandler extends BaseQueryHandler<ListDashboardsQuery, readonly DashboardResponseData[]>
  implements IQueryHandler<ListDashboardsQuery> {
  readonly queryType = 'analytics.dashboard.list';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(query: ListDashboardsQuery): Promise<readonly DashboardResponseData[]> {
    return query.onlyOwned
      ? this.service.listByOwner(query.userId)
      : this.service.listAccessible(query.userId);
  }
}
