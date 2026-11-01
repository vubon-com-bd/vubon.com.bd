import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInsurancesByOrderQuery extends BaseQuery {
  readonly type = 'logistics.insurance.list_by_order';
  constructor(public readonly orderId: string) { super(); }
}
