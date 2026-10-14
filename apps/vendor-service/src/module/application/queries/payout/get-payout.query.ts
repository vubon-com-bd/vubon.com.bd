import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPayoutQuery extends BaseQuery {
  readonly type = 'vendor.payout.get';
  constructor(public readonly payoutId: string) {
    super();
  }
}
