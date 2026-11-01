/**
 * GetPaymentStatsQuery
 * @module payment-service/application/queries/payment
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentStatsQuery extends BaseQuery {
  readonly type = 'payment.payment.stats';
  constructor(public readonly userId?: string) {
    super();
  }
}
