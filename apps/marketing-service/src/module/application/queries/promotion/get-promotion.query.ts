import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPromotionQuery extends BaseQuery {
  readonly type = 'marketing.promotion.get';

  constructor(public readonly promotionId: string) {
    super();
  }
}
