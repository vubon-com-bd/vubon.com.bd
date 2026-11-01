import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetStatsFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.getStats';
  constructor() { super(); }
}
