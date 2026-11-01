/**
 * GetSubscriptionQuery
 * @module payment-service/application/queries/subscription
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetSubscriptionQuery extends BaseQuery {
  readonly type = 'payment.subscription.get';
  constructor(public readonly subscriptionId: string) {
    super();
  }
}
