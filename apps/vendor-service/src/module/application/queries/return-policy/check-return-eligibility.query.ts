import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class CheckReturnEligibilityQuery extends BaseQuery {
  readonly type = 'vendor.return_policy.check_eligibility';
  constructor(
    public readonly vendorId: string,
    public readonly deliveredAt: string,
  ) { super(); }
}
