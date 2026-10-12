import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { WarehouseListOptionsDTO } from '../../services/interfaces/warehouse.service.interface.js';
export class ListWarehousesQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list';
  constructor(public readonly options: WarehouseListOptionsDTO) { super(); }
}
