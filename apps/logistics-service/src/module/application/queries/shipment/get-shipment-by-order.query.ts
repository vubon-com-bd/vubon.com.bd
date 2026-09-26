import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetShipmentByOrderQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
