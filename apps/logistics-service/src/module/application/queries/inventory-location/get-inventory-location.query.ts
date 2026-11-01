import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInventoryLocationQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.get';
  constructor(public readonly inventoryLocationId: string) { super(); }
}
