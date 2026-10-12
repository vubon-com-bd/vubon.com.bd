import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUserAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.user.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
