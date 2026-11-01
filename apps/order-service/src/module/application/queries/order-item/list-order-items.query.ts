/**
 * ListOrderItemsQuery
 * @module order-service/application/queries/order-item
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListOrderItemsQuery extends BaseQuery {
  readonly type = 'order.order-item.list';
  constructor(public readonly orderId: string) {
    super();
  }
}
