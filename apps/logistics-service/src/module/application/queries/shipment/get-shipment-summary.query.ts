import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentSummaryQuery extends BaseQuery {
  readonly type = 'logistics.shipment.summary';
  constructor(public readonly shipmentId: string) { super(); }
}
