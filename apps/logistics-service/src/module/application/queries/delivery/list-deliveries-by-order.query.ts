import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListDeliveriesByOrderQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list_by_order';
  constructor(public readonly orderId: string) { super(); }
}
