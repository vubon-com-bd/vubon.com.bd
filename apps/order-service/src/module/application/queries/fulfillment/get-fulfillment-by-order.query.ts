import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetFulfillmentByOrderQuery extends BaseQuery {
  readonly type = 'fulfillment.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
