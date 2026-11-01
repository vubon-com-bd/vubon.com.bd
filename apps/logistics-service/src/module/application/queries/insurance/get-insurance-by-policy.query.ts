import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInsuranceByPolicyQuery extends BaseQuery {
  readonly type = 'logistics.insurance.by_policy';
  constructor(public readonly policyNumber: string) { super(); }
}
