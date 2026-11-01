import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListWarehousesByZoneQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.list_by_zone';
  constructor(public readonly zone: string) { super(); }
}
