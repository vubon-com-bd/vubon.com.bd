import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorPublicQuery extends BaseQuery {
  readonly type = 'vendor.get_public';
  constructor(public readonly vendorId: string) { super(); }
}
