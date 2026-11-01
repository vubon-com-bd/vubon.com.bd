import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetInventoryLocationByCodeQuery extends BaseQuery {
  readonly type = 'logistics.inventory_location.by_code';
  constructor(public readonly code: string) { super(); }
}
