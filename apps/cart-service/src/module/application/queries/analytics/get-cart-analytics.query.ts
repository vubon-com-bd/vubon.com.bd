import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCartAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.cart';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
