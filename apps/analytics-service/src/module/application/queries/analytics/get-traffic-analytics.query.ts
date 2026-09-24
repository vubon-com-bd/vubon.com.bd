import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTrafficAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-traffic';

  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {
    super();
  }
}
