import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetWarehouseStatsQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.stats';
  constructor() { super(); }
}
