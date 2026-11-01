import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetWarehouseQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.get';
  constructor(public readonly warehouseId: string) { super(); }
}
