import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDashboardQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.get';
  constructor(
    public readonly dashboardId: string,
    public readonly userId: string
  ) { super(); }
}
