import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListTransactionsByPaymentQuery extends BaseQuery {
  readonly type = 'transaction.list-by-payment';
  constructor(public readonly paymentId: string) { super(); }
}
