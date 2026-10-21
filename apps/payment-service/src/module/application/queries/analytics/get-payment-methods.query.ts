/**
 * GetPaymentMethodsAnalyticsQuery
 * @module payment-service/application/queries/analytics
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentMethodsAnalyticsQuery extends BaseQuery {
  readonly type = 'payment.analytics.methods';
  constructor(
    public readonly userId?: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
