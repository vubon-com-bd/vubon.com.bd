import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorSubscriptionPublicQuery extends BaseQuery {
  readonly type = 'vendor.subscription.get_public';
  constructor(public readonly vendorId: string) { super(); }
}
