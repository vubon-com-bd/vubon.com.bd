import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorSummaryQuery extends BaseQuery {
  readonly type = 'vendor.get_summary';
  constructor(public readonly vendorId: string) { super(); }
}
