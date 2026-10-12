import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentStatsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get_stats';
  constructor(public readonly userId?: string, public readonly vendorId?: string) { super(); }
}
