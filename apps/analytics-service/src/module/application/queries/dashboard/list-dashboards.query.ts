import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListDashboardsQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.list';
  constructor(
    public readonly userId: string,
    public readonly onlyOwned: boolean = false
  ) { super(); }
}
