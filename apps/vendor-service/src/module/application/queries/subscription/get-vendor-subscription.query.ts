import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetVendorSubscriptionQuery extends BaseQuery {
  readonly type = 'vendor.subscription.get';
  constructor(public readonly vendorId: string) { super(); }
}
