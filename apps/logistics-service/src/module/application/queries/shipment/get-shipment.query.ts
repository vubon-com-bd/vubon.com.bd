import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetShipmentQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get';

  constructor(public readonly shipmentId: string) {
    super();
  }
}
