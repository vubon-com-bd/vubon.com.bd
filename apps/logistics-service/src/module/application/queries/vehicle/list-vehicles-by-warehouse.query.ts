import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListVehiclesByWarehouseQuery extends BaseQuery {
  readonly type = 'logistics.vehicle.list_by_warehouse';
  constructor(public readonly warehouseId: string) { super(); }
}
