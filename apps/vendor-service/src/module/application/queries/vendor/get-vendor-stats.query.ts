import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorStatsQuery extends BaseQuery {
  readonly type = 'vendor.get_stats';
  constructor(public readonly vendorId: string) { super(); }
}
