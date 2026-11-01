import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { InventoryLocationListOptionsDTO } from '@application/services/interfaces/inventory-location.service.interface';
export class ListInventoryLocationsQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.list';
  constructor(public readonly options: InventoryLocationListOptionsDTO) { super(); }
}
