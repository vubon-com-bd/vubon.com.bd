import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentByTrackingQuery extends BaseQuery {
  readonly type = 'logistics.shipment.by_tracking';
  constructor(public readonly trackingNumber: string) { super(); }
}
