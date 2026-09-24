import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMetricQuery extends BaseQuery {
  readonly type = 'analytics.metric.get';

  constructor(public readonly metricId: string) {
    super();
  }
}
