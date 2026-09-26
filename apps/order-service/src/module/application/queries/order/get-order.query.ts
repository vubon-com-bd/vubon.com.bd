import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetOrderQuery extends BaseQuery {
  readonly type = 'order.get';

  constructor(public readonly orderId: string) {
    super();
  }
}
