import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { AggregateMetricDto } from '../../dtos/requests/metric/aggregate-metric.dto.js';

export class AggregateMetricQuery extends BaseQuery {
  readonly type = 'analytics.metric.aggregate';
  constructor(public readonly payload: AggregateMetricDto) { super(); }
}
