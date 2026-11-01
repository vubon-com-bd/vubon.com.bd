/**
 * GetInvoiceQuery
 * @module payment-service/application/queries/invoice
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetInvoiceQuery extends BaseQuery {
  readonly type = 'payment.invoice.get';
  constructor(public readonly invoiceId: string) {
    super();
  }
}
