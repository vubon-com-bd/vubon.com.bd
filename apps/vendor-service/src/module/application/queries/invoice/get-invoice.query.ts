import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetInvoiceQuery extends BaseQuery {
  readonly type = 'vendor.invoice.get';
  constructor(public readonly invoiceId: string) { super(); }
}
