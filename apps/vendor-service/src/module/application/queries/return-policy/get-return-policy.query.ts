import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetReturnPolicyQuery extends BaseQuery {
  readonly type = 'vendor.return_policy.get';
  constructor(public readonly vendorId: string) {
    super();
  }
}
