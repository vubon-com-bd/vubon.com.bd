import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetShipmentStatsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get-stats';

  constructor(public readonly vendorId?: string) {
    super();
  }
}
