import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInsuranceStatsQuery extends BaseQuery {
  readonly type = 'logistics.insurance.stats';
  constructor() { super(); }
}
