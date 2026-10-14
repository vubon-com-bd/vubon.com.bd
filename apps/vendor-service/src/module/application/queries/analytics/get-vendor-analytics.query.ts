/**
 * GetVendorAnalyticsQuery
 * @module vendor-service/application/queries/analytics
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorAnalyticsQuery extends BaseQuery {
  readonly type = 'vendor.analytics.get';
  constructor(
    public readonly vendorId: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
