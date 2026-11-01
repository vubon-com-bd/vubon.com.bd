import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInsurancesByUserQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list_by_user';
  constructor(public readonly userId: string) { super(); }
}
