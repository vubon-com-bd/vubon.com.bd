import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDefaultWarehouseQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.get_default';
  constructor() { super(); }
}
