import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReviewStatsQuery extends BaseQuery {
  readonly type = 'review.stats';
  constructor(public readonly productId: string) { super(); }
}
