import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class AggregateMetricQuery extends BaseQuery {
  readonly type = 'analytics.metric.aggregate';

  constructor(
    public readonly metricNames: readonly string[],
    public readonly aggregation: string,
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly interval?: string,
    public readonly groupBy?: readonly string[],
  ) {
    super();
  }
}
