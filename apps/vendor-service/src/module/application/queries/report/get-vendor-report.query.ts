import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorReportQuery extends BaseQuery {
  readonly type = 'vendor.report.get';
  constructor(public readonly reportId: string) { super(); }
}
