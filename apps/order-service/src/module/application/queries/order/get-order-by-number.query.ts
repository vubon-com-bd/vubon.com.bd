/**
 * GetOrderByNumberQuery
 * @module order-service/application/queries/order
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderByNumberQuery extends BaseQuery {
  readonly type = 'order.order.get-by-number';
  constructor(public readonly orderNumber: string) {
    super();
  }
}
