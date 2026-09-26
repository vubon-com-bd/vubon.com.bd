import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVendorAnalyticsQuery extends BaseQuery {
  readonly type = 'vendor.analytics.get';

  constructor(
    public readonly vendorId: string,
    public readonly periodStart?: string,
    public readonly periodEnd?: string,
  ) {
    super();
  }
}
