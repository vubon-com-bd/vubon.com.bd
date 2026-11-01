import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListPendingFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.listPending';
  constructor() { super(); }
}
