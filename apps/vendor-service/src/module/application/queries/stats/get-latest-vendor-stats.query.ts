import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetLatestVendorStatsQuery extends BaseQuery {
  readonly type = 'vendor.stats.get_latest';
  constructor(public readonly vendorId: string) { super(); }
}
