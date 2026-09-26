import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDashboardQuery } from './get-dashboard.query';
import type { DashboardRepository } from '../../../domain/repositories/dashboard.repository.interface';
import { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo';
import { DashboardNotFoundError } from '../../../domain/errors/dashboard.errors';
import {
  type DashboardResponseDTO,
  toDashboardResponse,
} from '../../dtos/responses';

@QueryHandler(GetDashboardQuery)
export class GetDashboardHandler
  extends BaseQueryHandler<GetDashboardQuery, DashboardResponseDTO>
  implements IQueryHandler<GetDashboardQuery>
{
  readonly queryType = 'analytics.dashboard.get';

  constructor(private readonly dashboardRepo: DashboardRepository) {
    super();
  }

  async execute(query: GetDashboardQuery): Promise<DashboardResponseDTO> {
    const entity = await this.dashboardRepo.findById(
      DashboardIdVO.create(query.dashboardId),
    );
    if (!entity) throw new DashboardNotFoundError(query.dashboardId);
    return toDashboardResponse(entity);
  }
}
