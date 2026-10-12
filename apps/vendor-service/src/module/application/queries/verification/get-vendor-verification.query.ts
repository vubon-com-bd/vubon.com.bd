import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorVerificationQuery extends BaseQuery {
  readonly type = 'vendor.verification.get';
  constructor(public readonly vendorId: string) { super(); }
}
