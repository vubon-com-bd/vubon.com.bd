import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDashboardDataQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.get-data';

  constructor(
    public readonly dashboardId: string,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {
    super();
  }
}
