import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPerformanceQuery extends BaseQuery {
  readonly type = 'vendor.performance.get';

  constructor(public readonly vendorId: string) {
    super();
  }
}
