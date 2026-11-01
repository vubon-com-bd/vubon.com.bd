/**
 * ListSubscriptionsQuery
 * @module payment-service/application/queries/subscription
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListSubscriptionsQuery extends BaseQuery {
  readonly type = 'payment.subscription.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly userId?: string;
      readonly status?: string;
      readonly plan?: string;
    },
    public readonly sortBy?: 'createdAt' | 'currentPeriodEnd' | 'price',
    public readonly sortDir?: 'asc' | 'desc',
  ) {
    super();
  }
}
