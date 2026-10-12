import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentByIdQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get_by_id';
  constructor(public readonly shipmentId: string) { super(); }
}
