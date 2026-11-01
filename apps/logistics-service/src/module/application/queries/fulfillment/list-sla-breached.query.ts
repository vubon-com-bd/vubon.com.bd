import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListSlaBreachedFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.listSlaBreached';
  constructor() { super(); }
}
