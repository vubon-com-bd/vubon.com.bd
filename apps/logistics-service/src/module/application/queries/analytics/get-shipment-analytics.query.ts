import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetShipmentAnalyticsQuery extends BaseQuery {
  readonly type = 'logistics.analytics.shipment';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
