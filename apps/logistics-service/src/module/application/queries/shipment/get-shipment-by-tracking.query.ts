import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentByTrackingQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get_by_tracking';
  constructor(public readonly trackingNumber: string) { super(); }
}
