import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByWarehouseFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.listByWarehouse';
  constructor(public readonly warehouseId: string) { super(); }
}
