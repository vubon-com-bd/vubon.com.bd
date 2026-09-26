import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class TimeSeriesQuery extends BaseQuery {
  readonly type = 'analytics.metric.time-series';

  constructor(
    public readonly metricName: string,
    public readonly interval: string,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {
    super();
  }
}
