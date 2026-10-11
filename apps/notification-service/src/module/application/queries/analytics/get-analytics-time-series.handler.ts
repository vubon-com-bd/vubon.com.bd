import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAnalyticsTimeSeriesQuery } from './get-analytics-time-series.query.js';
import { ANALYTICS_SERVICE, type IAnalyticsService } from '../../services/interfaces/analytics.service.interface.js';
import type { AnalyticsTimeSeriesResponseDTO } from '../../dtos/responses/analytics-response.dto.js';

@QueryHandler(GetAnalyticsTimeSeriesQuery)
export class GetAnalyticsTimeSeriesHandler
  implements IQueryHandler<GetAnalyticsTimeSeriesQuery, AnalyticsTimeSeriesResponseDTO>
{
  constructor(@Inject(ANALYTICS_SERVICE) private readonly service: IAnalyticsService) {}

  async execute(q: GetAnalyticsTimeSeriesQuery): Promise<AnalyticsTimeSeriesResponseDTO> {
    return this.service.timeSeries(q.options);
  }
}
