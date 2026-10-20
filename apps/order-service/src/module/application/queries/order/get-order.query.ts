/**
 * GetOrderQuery
 * @module order-service/application/queries/order
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderQuery extends BaseQuery {
  readonly type = 'order.order.get';
  constructor(public readonly orderId: string) {
    super();
  }
}
