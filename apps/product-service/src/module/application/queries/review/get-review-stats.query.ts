import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetReviewStatsQuery extends BaseQuery {
  readonly type = 'product.review.stats';

  constructor(public readonly productId: string) {
    super();
  }
}
