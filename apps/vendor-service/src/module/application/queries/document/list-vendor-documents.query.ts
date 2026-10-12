import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListVendorDocumentsQuery extends BaseQuery {
  readonly type = 'vendor.document.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
