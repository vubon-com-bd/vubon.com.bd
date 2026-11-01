import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetTrackingByShipmentQuery extends BaseQuery {
  readonly type = 'logistics.tracking.by_shipment';
  constructor(public readonly shipmentId: string) { super(); }
}
