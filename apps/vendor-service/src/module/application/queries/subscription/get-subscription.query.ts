import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSubscriptionQuery extends BaseQuery {
  readonly type = 'vendor.subscription.get';

  constructor(public readonly vendorId: string) {
    super();
  }
}
