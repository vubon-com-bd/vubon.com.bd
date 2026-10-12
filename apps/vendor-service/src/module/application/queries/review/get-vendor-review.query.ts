import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorReviewQuery extends BaseQuery {
  readonly type = 'vendor.review.get';
  constructor(public readonly reviewId: string) { super(); }
}
