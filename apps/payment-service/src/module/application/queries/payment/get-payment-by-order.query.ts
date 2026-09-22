import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPaymentByOrderQuery extends BaseQuery {
  readonly type = 'payment.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
