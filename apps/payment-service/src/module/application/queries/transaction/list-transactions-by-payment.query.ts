import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTransactionsByPaymentQuery extends BaseQuery {
  readonly type = 'transaction.list_by_payment';
  constructor(public readonly paymentId: string) {
    super();
  }
}
