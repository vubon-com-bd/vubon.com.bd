import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMarketingAnalyticsQuery extends BaseQuery {
  readonly type = 'marketing.analytics.get';

  constructor(public readonly metric: string) {
    super();
  }
}
