import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetTrackingByShipmentQuery extends BaseQuery {
  readonly type = 'logistics.tracking.get-by-shipment';

  constructor(public readonly shipmentId: string) {
    super();
  }
}
