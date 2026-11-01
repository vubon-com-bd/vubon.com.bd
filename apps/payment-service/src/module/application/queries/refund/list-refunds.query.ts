/**
 * ListRefundsQuery
 * @module payment-service/application/queries/refund
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListRefundsQuery extends BaseQuery {
  readonly type = 'payment.refund.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly paymentId?: string;
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
