import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentTimelineQuery extends BaseQuery {
  readonly type = 'logistics.shipment.timeline';
  constructor(public readonly shipmentId: string) { super(); }
}
