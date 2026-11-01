import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInventoryLocationsByZoneQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.list_by_zone';
  constructor(public readonly warehouseId: string, public readonly zone: string) { super(); }
}
