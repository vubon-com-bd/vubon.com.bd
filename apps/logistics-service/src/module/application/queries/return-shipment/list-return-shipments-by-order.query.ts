import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListReturnShipmentsByOrderQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.list_by_order';
  constructor(public readonly orderId: string) { super(); }
}
