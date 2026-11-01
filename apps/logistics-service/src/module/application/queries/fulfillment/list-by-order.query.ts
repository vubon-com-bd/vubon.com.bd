import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByOrderFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.listByOrder';
  constructor(public readonly orderId: string) { super(); }
}
