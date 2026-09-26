import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListReviewsQuery extends BaseQuery {
  readonly type = 'product.review.list';

  constructor(public readonly productId: string) {
    super();
  }
}
