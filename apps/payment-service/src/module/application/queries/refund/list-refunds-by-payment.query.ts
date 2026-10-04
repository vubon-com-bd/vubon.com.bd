import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListRefundsByPaymentQuery extends BaseQuery {
  readonly type = 'refund.list_by_payment';
  constructor(public readonly paymentId: string) {
    super();
  }
}
