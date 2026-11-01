import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDeliveryByShipmentQuery extends BaseQuery {
  readonly type = 'logistics.delivery.by_shipment';
  constructor(public readonly shipmentId: string) { super(); }
}
