import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListDriversByWarehouseQuery extends BaseQuery {
  readonly type = 'logistics.driver.list_by_warehouse';
  constructor(public readonly warehouseId: string) { super(); }
}
