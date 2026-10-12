import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListSettlementsByVendorQuery extends BaseQuery {
  readonly type = 'vendor.settlement.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
