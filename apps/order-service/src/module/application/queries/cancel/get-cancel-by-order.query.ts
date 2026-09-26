import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCancelByOrderQuery extends BaseQuery {
  readonly type = 'order.cancel.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
