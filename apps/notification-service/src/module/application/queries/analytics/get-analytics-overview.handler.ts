import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAnalyticsOverviewQuery } from './get-analytics-overview.query.js';
import { ANALYTICS_SERVICE, type IAnalyticsService } from '../../services/interfaces/analytics.service.interface.js';
import type { AnalyticsOverviewResponseDTO } from '../../dtos/responses/analytics-response.dto.js';

@QueryHandler(GetAnalyticsOverviewQuery)
export class GetAnalyticsOverviewHandler
  implements IQueryHandler<GetAnalyticsOverviewQuery, AnalyticsOverviewResponseDTO>
{
  constructor(@Inject(ANALYTICS_SERVICE) private readonly service: IAnalyticsService) {}

  async execute(q: GetAnalyticsOverviewQuery): Promise<AnalyticsOverviewResponseDTO> {
    return this.service.overview(q.options);
  }
}
