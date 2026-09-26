import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDashboardQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.get';

  constructor(public readonly dashboardId: string) {
    super();
  }
}
