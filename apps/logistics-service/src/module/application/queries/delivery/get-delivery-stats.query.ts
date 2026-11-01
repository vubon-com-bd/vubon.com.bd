import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDeliveryStatsQuery extends BaseQuery {
  readonly type = 'logistics.delivery.stats';
  constructor(
    public readonly driverId?: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) { super(); }
}
