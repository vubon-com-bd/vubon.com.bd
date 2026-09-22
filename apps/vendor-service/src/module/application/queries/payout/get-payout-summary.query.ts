import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPayoutSummaryQuery extends BaseQuery {
  readonly type = 'vendor.payout.summary';

  constructor(public readonly vendorId: string) {
    super();
  }
}
