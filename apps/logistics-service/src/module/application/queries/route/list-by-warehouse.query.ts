import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByWarehouseRouteQuery extends BaseQuery {
  readonly type = 'logistics.route.list_by_warehouse';
  constructor(public readonly warehouseId: string) { super(); }
}
