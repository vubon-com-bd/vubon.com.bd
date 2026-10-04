import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { OrderListOptionsDTO } from '../../services/interfaces/order.service.interface.js';

export class ListOrdersByVendorQuery extends BaseQuery {
  readonly type = 'order.list_by_vendor';
  constructor(
    public readonly vendorId: string,
    public readonly options: OrderListOptionsDTO,
  ) { super(); }
}
