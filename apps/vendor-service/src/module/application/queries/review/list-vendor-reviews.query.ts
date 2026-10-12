import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListVendorReviewsQuery extends BaseQuery {
  readonly type = 'vendor.review.list_by_vendor';
  constructor(public readonly vendorId: string) { super(); }
}
