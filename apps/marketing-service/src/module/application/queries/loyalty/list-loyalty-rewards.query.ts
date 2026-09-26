import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListLoyaltyRewardsQuery extends BaseQuery {
  readonly type = 'marketing.loyalty.list-rewards';

  constructor() {
    super();
  }
}
