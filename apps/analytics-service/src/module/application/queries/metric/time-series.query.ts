import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { TimeSeriesQueryDto } from '../../dtos/requests/query/time-series-query.dto.js';

export class TimeSeriesQuery extends BaseQuery {
  readonly type = 'analytics.metric.time-series';
  constructor(public readonly payload: TimeSeriesQueryDto) { super(); }
}
