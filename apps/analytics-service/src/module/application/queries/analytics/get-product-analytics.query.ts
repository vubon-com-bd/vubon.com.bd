import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetProductAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.product.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
