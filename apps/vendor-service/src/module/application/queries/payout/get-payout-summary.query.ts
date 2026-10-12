import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPayoutSummaryQuery extends BaseQuery {
  readonly type = 'vendor.payout.get_summary';
  constructor(public readonly vendorId: string) { super(); }
}
