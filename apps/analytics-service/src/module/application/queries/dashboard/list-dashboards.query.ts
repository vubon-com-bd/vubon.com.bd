import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListDashboardsQuery extends BaseQuery {
  readonly type = 'analytics.dashboard.list';

  constructor(public readonly ownerId: string) {
    super();
  }
}
