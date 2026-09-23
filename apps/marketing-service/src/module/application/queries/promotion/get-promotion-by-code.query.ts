import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPromotionByCodeQuery extends BaseQuery {
  readonly type = 'marketing.promotion.get-by-code';

  constructor(public readonly code: string) {
    super();
  }
}
