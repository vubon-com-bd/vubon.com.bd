import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorReturnPolicyQuery extends BaseQuery {
  readonly type = 'vendor.return_policy.get';
  constructor(public readonly vendorId: string) { super(); }
}
