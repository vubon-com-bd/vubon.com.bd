import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorApprovalQuery extends BaseQuery {
  readonly type = 'vendor.approval.get';
  constructor(public readonly vendorId: string) { super(); }
}
