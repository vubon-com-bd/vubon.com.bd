import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { TimeSeriesQuery } from './time-series.query.js';
import type { TimeSeriesResponseData } from '../../dtos/responses/time-series-response.dto.js';

@Injectable()
@QueryHandler(TimeSeriesQuery)
export class TimeSeriesHandler extends BaseQueryHandler<TimeSeriesQuery, TimeSeriesResponseData>
  implements IQueryHandler<TimeSeriesQuery> {
  readonly queryType = 'analytics.metric.time-series';
  async execute(query: TimeSeriesQuery): Promise<TimeSeriesResponseData> {
    return {
      metric: query.payload.metric,
      aggregation: query.payload.aggregation ?? 'sum',
      granularity: query.payload.granularity,
      fromDate: query.payload.fromDate,
      toDate: query.payload.toDate,
      points: [],
      total: 0,
      average: 0,
    };
  }
}
