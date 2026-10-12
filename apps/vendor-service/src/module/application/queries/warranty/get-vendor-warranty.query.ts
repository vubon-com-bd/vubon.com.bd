import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorWarrantyQuery extends BaseQuery {
  readonly type = 'vendor.warranty.get';
  constructor(public readonly vendorId: string) { super(); }
}
