import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentDetailQuery extends BaseQuery {
  readonly type = 'payment.get_detail';
  constructor(public readonly paymentId: string) {
    super();
  }
}
