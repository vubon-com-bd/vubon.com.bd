import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDashboardDataQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.data';
  constructor(
    public readonly dashboardId: string,
    public readonly userId: string
  ) { super(); }
}
