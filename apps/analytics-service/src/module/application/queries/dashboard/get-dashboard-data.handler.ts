import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDashboardDataQuery } from './get-dashboard-data.query';
import type { DashboardRepository } from '../../../domain/repositories/dashboard.repository.interface';
import type { WidgetRepository } from '../../../domain/repositories/widget.repository.interface';
import { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo';
import { DashboardNotFoundError } from '../../../domain/errors/dashboard.errors';
import {
  type WidgetResponseDTO,
  toWidgetResponse,
} from '../../dtos/responses';

@QueryHandler(GetDashboardDataQuery)
export class GetDashboardDataHandler
  extends BaseQueryHandler<GetDashboardDataQuery, readonly WidgetResponseDTO[]>
  implements IQueryHandler<GetDashboardDataQuery>
{
  readonly queryType = 'analytics.dashboard.get-data';

  constructor(
    private readonly dashboardRepo: DashboardRepository,
    private readonly widgetRepo: WidgetRepository,
  ) {
    super();
  }

  async execute(query: GetDashboardDataQuery): Promise<readonly WidgetResponseDTO[]> {
    const dashboard = await this.dashboardRepo.findById(
      DashboardIdVO.create(query.dashboardId),
    );
    if (!dashboard) throw new DashboardNotFoundError(query.dashboardId);
    const widgets = await this.widgetRepo.findByDashboardId(query.dashboardId);
    return widgets.map((w) => toWidgetResponse(w));
  }
}
