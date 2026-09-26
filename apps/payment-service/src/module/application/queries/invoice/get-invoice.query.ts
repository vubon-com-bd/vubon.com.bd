import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetInvoiceQuery extends BaseQuery {
  readonly type = 'invoice.get';

  constructor(public readonly invoiceId: string) {
    super();
  }
}
