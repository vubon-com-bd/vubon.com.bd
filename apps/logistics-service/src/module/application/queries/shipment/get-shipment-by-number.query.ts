import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentByNumberQuery extends BaseQuery {
  readonly type = 'logistics.shipment.by_number';
  constructor(public readonly shipmentNumber: string) { super(); }
}
