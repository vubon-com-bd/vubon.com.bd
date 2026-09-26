import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPaymentQuery extends BaseQuery {
  readonly type = 'payment.get';

  constructor(public readonly paymentId: string) {
    super();
  }
}
