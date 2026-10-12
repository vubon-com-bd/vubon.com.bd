import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListVendorPerformanceQuery extends BaseQuery {
  readonly type = 'vendor.performance.list';
  constructor(public readonly vendorId: string) { super(); }
}
