import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetDashboardDataQuery } from './get-dashboard-data.query.js';
@Injectable()
@QueryHandler(GetDashboardDataQuery)
export class GetDashboardDataHandler extends BaseQueryHandler<GetDashboardDataQuery, unknown>
  implements IQueryHandler<GetDashboardDataQuery> {
  readonly queryType = 'analytics.dashboard.data';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(query: GetDashboardDataQuery): Promise<unknown> {
    return { dashboardId: query.dashboardId, widgets: [] };
  }
}
