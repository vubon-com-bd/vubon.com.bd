/**
 * ListTransactionsQuery
 * @module payment-service/application/queries/transaction
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTransactionsQuery extends BaseQuery {
  readonly type = 'payment.transaction.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly paymentId?: string;
      readonly type?: string;
      readonly status?: string;
      readonly fromDate?: string;
      readonly toDate?: string;
    },
    public readonly sortBy?: 'createdAt' | 'amount' | 'status',
    public readonly sortDir?: 'asc' | 'desc',
  ) {
    super();
  }
}
