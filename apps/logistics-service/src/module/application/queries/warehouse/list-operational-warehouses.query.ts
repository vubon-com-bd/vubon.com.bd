import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListOperationalWarehousesQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list_operational';
  constructor() { super(); }
}
