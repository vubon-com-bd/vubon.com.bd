import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListShipmentsByOrderQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list_by_order';
  constructor(public readonly orderId: string) { super(); }
}
