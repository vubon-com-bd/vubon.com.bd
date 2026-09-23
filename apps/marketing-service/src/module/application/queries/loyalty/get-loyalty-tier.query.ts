import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetLoyaltyTierQuery extends BaseQuery {
  readonly type = 'marketing.loyalty.get-tier';

  constructor(public readonly tier: string) {
    super();
  }
}
