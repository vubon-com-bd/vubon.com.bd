import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.vendor.get';
  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly filters?: Record<string, unknown>
  ) { super(); }
}
