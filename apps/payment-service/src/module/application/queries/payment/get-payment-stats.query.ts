import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentStatsQuery extends BaseQuery {
  readonly type = 'payment.get_stats';
  constructor(
    public readonly userId?: string,
    public readonly gateway?: string,
  ) {
    super();
  }
}
