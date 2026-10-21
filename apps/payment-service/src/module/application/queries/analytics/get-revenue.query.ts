/**
 * GetRevenueQuery
 * @module payment-service/application/queries/analytics
 *
 * Returns aggregated revenue stats over a date range.
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRevenueQuery extends BaseQuery {
  readonly type = 'payment.analytics.revenue';
  constructor(
    public readonly userId?: string,
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
