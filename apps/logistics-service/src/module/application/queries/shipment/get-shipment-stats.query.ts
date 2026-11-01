import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentStatsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.stats';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
    public readonly warehouseId?: string,
  ) { super(); }
}
