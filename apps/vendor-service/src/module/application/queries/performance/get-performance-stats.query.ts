import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPerformanceStatsQuery extends BaseQuery {
  readonly type = 'vendor.performance.stats';
  constructor(public readonly vendorId?: string) {
    super();
  }
}
