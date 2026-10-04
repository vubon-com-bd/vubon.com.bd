import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetAbandonedStatsQuery extends BaseQuery {
  readonly type = 'abandoned.stats';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
