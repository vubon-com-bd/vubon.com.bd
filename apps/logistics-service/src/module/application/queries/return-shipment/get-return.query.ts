import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReturnQuery extends BaseQuery {
  readonly type = 'logistics.return-shipment.get';

  constructor(public readonly returnShipmentId: string) {
    super();
  }
}
