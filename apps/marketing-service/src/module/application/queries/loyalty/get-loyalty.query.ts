import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetLoyaltyQuery extends BaseQuery {
  readonly type = 'marketing.loyalty.get';

  constructor(public readonly userId: string) {
    super();
  }
}
