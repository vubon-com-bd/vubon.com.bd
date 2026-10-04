import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListDeliveriesQuery extends BaseQuery {
  readonly type = 'delivery.list';
  constructor(public readonly orderId: string) { super(); }
}
