import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { OrderListOptionsDTO } from '../../services/interfaces/order.service.interface.js';

export class ListOrdersQuery extends BaseQuery {
  readonly type = 'order.list';
  constructor(public readonly options: OrderListOptionsDTO) { super(); }
}
