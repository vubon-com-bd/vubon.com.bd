import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorPerformanceQuery extends BaseQuery {
  readonly type = 'vendor.performance.get';
  constructor(public readonly vendorId: string) { super(); }
}
