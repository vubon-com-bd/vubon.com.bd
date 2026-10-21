/**
 * GetPaymentByOrderQuery
 * @module payment-service/application/queries/payment
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPaymentByOrderQuery extends BaseQuery {
  readonly type = 'payment.payment.by_order';
  constructor(public readonly orderId: string) {
    super();
  }
}
