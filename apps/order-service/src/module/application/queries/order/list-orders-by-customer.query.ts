/**
 * ListOrdersByCustomerQuery
 * @module order-service/application/queries/order
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { OrderListOptionsDTO } from '../../services/interfaces/order.service.interface.js';

export class ListOrdersByCustomerQuery extends BaseQuery {
  readonly type = 'order.order.list-by-customer';
  constructor(
    public readonly customerId: string,
    public readonly options: OrderListOptionsDTO,
  ) {
    super();
  }
}
