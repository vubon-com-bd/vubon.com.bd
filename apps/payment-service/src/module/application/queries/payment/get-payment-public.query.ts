import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentPublicQuery extends BaseQuery {
  readonly type = 'payment.get_public';
  constructor(public readonly paymentId: string) {
    super();
  }
}
