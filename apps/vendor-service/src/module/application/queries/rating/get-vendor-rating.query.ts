import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorRatingQuery extends BaseQuery {
  readonly type = 'vendor.rating.get';
  constructor(public readonly vendorId: string) { super(); }
}
