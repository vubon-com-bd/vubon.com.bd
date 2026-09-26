import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListReviewsQuery extends BaseQuery {
  readonly type = 'vendor.review.list';

  constructor(
    public readonly vendorId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
