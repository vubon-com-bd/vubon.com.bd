import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.delivery';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
