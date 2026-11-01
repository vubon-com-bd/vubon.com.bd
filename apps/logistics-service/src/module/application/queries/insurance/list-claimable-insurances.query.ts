import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListClaimableInsurancesQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list_claimable';
  constructor() { super(); }
}
