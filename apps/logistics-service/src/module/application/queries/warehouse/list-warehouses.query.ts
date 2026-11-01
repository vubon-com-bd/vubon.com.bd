import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { WarehouseListOptionsDTO } from '@application/services/interfaces/warehouse.service.interface';
export class ListWarehousesQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list';
  constructor(public readonly options: WarehouseListOptionsDTO) { super(); }
}
