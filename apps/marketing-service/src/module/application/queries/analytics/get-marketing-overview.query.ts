import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMarketingOverviewQuery extends BaseQuery {
  readonly type = 'marketing.analytics.overview';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
