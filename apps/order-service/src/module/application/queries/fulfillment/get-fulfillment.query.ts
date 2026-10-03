import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetFulfillmentQuery extends BaseQuery {
  readonly type = 'fulfillment.get';
  constructor(public readonly fulfillmentId: string) { super(); }
}
