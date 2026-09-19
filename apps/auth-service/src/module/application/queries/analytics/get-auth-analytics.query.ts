import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface AuthAnalyticsFilter {
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly groupBy?: 'day' | 'week' | 'month';
}

export class GetAuthAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-auth';

  constructor(
    public readonly userId?: string,
    public readonly filter?: AuthAnalyticsFilter,
  ) {
    super();
  }
}
