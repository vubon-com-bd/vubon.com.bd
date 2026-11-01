import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInventoryLocationStatsQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.stats';
  constructor(public readonly warehouseId?: string) { super(); }
}
