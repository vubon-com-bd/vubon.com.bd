import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListDeliveriesByDriverQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list_by_driver';
  constructor(public readonly driverId: string) { super(); }
}
