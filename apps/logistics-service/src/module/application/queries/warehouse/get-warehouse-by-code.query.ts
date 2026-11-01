import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetWarehouseByCodeQuery extends BaseQuery {
  readonly type = 'logistics.warehouse.by_code';
  constructor(public readonly code: string) { super(); }
}
