import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListReviewsByProductQuery extends BaseQuery {
  readonly type = 'review.listByProduct';
  constructor(
    public readonly productId: string,
    public readonly page: number,
    public readonly limit: number,
  ) { super(); }
}
