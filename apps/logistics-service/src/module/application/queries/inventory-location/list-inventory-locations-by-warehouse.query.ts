import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInventoryLocationsByWarehouseQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.list_by_warehouse';
  constructor(public readonly warehouseId: string) { super(); }
}
