import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListPublicVendorReviewsQuery extends BaseQuery {
  readonly type = 'vendor.review.list_public';
  constructor(public readonly vendorId: string) { super(); }
}
