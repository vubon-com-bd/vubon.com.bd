import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReturnByOrderQuery extends BaseQuery {
  readonly type = 'order.return.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
