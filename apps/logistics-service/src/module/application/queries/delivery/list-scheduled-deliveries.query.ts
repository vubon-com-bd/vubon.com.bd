import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListScheduledDeliveriesQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list_scheduled';
  constructor() { super(); }
}
