import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetVendorStatsQuery extends BaseQuery {
  readonly type = 'vendor.get-stats';

  constructor(public readonly vendorId: string) {
    super();
  }
}
