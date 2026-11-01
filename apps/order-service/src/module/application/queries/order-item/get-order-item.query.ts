/**
 * GetOrderItemQuery
 * @module order-service/application/queries/order-item
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderItemQuery extends BaseQuery {
  readonly type = 'order.order-item.get';
  constructor(public readonly itemId: string) {
    super();
  }
}
