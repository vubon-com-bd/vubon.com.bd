import { DashboardService } from '../../services/impl/dashboard.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetDashboardQuery } from './get-dashboard.query.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

@Injectable()
@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler extends BaseQueryHandler<GetDashboardQuery, DashboardResponseData>
  implements IQueryHandler<GetDashboardQuery> {
  readonly queryType = 'analytics.dashboard.get';
  constructor(private readonly service: DashboardService) { super(); }
  async execute(query: GetDashboardQuery): Promise<DashboardResponseData> {
    const result = await this.service.findById(query.dashboardId, query.userId);
    if (!result) throw new ApplicationNotFoundError('Dashboard', query.dashboardId);
    return result;
  }
}
