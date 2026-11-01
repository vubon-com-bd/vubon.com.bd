/**
 * ListInvoicesQuery
 * @module payment-service/application/queries/invoice
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListInvoicesQuery extends BaseQuery {
  readonly type = 'payment.invoice.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly userId?: string;
      readonly orderId?: string;
      readonly status?: string;
      readonly fromDate?: string;
      readonly toDate?: string;
      readonly search?: string;
    },
    public readonly sortBy?: 'createdAt' | 'issuedAt' | 'dueAt' | 'total',
    public readonly sortDir?: 'asc' | 'desc',
  ) {
    super();
  }
}
