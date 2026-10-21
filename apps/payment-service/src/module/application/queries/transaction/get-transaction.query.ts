/**
 * GetTransactionQuery
 * @module payment-service/application/queries/transaction
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTransactionQuery extends BaseQuery {
  readonly type = 'payment.transaction.get';
  constructor(public readonly transactionId: string) {
    super();
  }
}
