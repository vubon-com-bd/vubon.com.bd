import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListPayoutsByVendorQuery extends BaseQuery {
  readonly type = 'vendor.payout.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
