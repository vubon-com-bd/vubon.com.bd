import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetReviewStatsQuery extends BaseQuery {
  readonly type = 'vendor.review.stats';
  constructor(public readonly vendorId?: string) {
    super();
  }
}
