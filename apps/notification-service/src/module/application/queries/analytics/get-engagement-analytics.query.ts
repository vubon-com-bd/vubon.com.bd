import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetEngagementAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.engagement';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
