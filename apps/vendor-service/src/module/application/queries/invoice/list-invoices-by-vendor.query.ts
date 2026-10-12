import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListInvoicesByVendorQuery extends BaseQuery {
  readonly type = 'vendor.invoice.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
