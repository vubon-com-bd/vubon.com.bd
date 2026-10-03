import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { OrderListOptionsDTO } from '../../services/interfaces/order.service.interface.js';

export class ListOrdersByCustomerQuery extends BaseQuery {
  readonly type = 'order.list_by_customer';
  constructor(
    public readonly customerId: string,
    public readonly options: OrderListOptionsDTO,
  ) { super(); }
}
