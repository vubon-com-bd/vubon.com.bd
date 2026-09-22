import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSubscriptionQuery extends BaseQuery {
  readonly type = 'subscription.get';
  constructor(public readonly subscriptionId: string) { super(); }
}
