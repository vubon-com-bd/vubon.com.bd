import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListExpiringInsurancesQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list_expiring';
  constructor(public readonly days: number) { super(); }
}
