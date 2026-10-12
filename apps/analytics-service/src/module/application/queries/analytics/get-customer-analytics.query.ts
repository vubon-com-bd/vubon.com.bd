import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCustomerAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.customer.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
