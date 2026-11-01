import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetTrackingStatsQuery extends BaseQuery {
  readonly type = 'logistics.tracking.stats';
  constructor() { super(); }
}
