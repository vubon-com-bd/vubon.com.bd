import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryRateQuery extends BaseQuery {
  readonly type = 'notification.analytics.delivery_rate';
  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
    public readonly channel?: string,
  ) { super(); }
}
