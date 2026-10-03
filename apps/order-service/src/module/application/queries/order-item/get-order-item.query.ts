import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderItemQuery extends BaseQuery {
  readonly type = 'order.item.get';
  constructor(public readonly itemId: string) { super(); }
}
