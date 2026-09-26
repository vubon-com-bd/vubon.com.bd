import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUserAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-user';

  constructor(
    public readonly userId: string,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {
    super();
  }
}
