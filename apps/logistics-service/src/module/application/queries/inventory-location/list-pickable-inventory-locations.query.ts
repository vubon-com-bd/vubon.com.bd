import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListPickableInventoryLocationsQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.list_pickable';
  constructor(public readonly warehouseId: string) { super(); }
}
