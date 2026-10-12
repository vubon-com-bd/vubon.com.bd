import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.order.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
