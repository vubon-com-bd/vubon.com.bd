import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderStatsQuery extends BaseQuery {
  readonly type = 'order.stats';
  constructor(
    public readonly customerId?: string,
    public readonly vendorId?: string,
  ) { super(); }
}
