import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListVendorReportsQuery extends BaseQuery {
  readonly type = 'vendor.report.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
